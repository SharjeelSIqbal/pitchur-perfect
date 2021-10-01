import React from 'react';
import { PitchDetector } from 'pitchy';
import Header from '../components/header';
import Footer from '../components/footer';
import Piano from '../components/piano';

export default class Pitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrequency: null,
      notes: null,
      isOn: false,
      currentKey: {},
      tuneVoice: false,
      isHitting: false,
      loading: true,
      failed: false
    };
    this.closestNote = null;
    this.closestOctave = null;
    this.closestNoteFrequency = null;
    this.closestHit = false;
    this.matchPiano = this.matchPiano.bind(this);
    this.updatePitch = this.updatePitch.bind(this);
    this.turnOnMic = this.turnOnMic.bind(this);
    this.stopMic = this.stopMic.bind(this);
    this.currentPianoKey = this.currentPianoKey.bind(this);
  }

  async componentDidMount() {
    await fetch('/api/notes')
      .then(response => response.json())
      .then(result => this.setState({ failed: false, notes: result, loading: false }))
      .catch(err => {
        this.setState({ failed: true, loading: false });
        return console.error(err);
      });
  }

  async turnOnMic(e) {
    this.setState({ isOn: !this.state.isOn });

    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    this.mediaRecorder = await navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const sourceNode = audioContext.createMediaStreamSource(stream);
        sourceNode.connect(analyserNode);
        const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
        const input = new Float32Array(detector.inputLength);
        this.updatePitch(analyserNode, detector, input, audioContext.sampleRate);
      });
  }

  matchPiano(e) {
    this.setState({ tuneVoice: !this.state.tuneVoice });
    // this.setState({ tuneVoice: true }, () => {
    //   this.turnOnMic();
    // });
  }

  stopMic(e) {
    this.setState({ isOn: false, tuneVoice: false });
  }

  measureFrequency() {
    if (!this.state.tuneVoice) {
      let recordDifference = Infinity;
      let diff = 0;
      this.state.notes.forEach(element => {
        diff = this.state.currentFrequency - element.frequency;
        if (Math.abs(diff) < Math.abs(recordDifference)) {
          this.closestNote = element.note;
          this.closestOctave = element.octave;
          this.closestNoteFrequency = element.frequency;
          recordDifference = diff;
        }
      });
    } if (this.state.tuneVoice) {
      if (this.state.currentKey) {
        this.closestNote = this.state.currentKey.note;
        this.closestOctave = this.state.currentKey.octave;
        this.closestNoteFrequency = parseFloat(this.state.currentKey.frequency);
        if (this.state.currentFrequency >= this.closestNoteFrequency - 7 && this.state.currentFrequency <= this.closestNoteFrequency + 7) {
          this.setState({ isHitting: true });
        } else {
          this.setState({ isHitting: false });
        }
      }
    }

  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updatePitch(analyserNode, detector, input, sampleRate) {
    analyserNode.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, sampleRate);

    if (this.state.isOn) {
      this.timeout = setTimeout(
        () => {
          this.setState({
            currentFrequency: Math.round(pitch * 10) / 10,
            clarity: Math.round(clarity * 100)
          }, () =>
            this.measureFrequency());
          this.updatePitch(analyserNode, detector, input, sampleRate);
        },
        100
      );
    }
  }

  currentPianoKey(current) {
    this.setState({ currentKey: current });
  }

  render() {
    const correct = this.state.isHitting ? 'correct' : null;
    return (
      <div>
        <Header />
        {this.state.loading &&
          <div className="row justify-center-all padding-input absolute-loading">
            <div className="lds-facebook loading"><div></div><div></div><div></div></div>
          </div>
        }
        { this.state.failed && <h2 className="font-pair text-align-center no-recordings">Problems with the network, please try again later</h2> }
        {!this.state.failed && !this.state.loading &&
        <>
        <div className="row justify-center-all padding-input">
          <div className="row justify-center-all background-pitch">
          <div className="background-pitch-inner row justify-center-all font-pair">
            <div>
                <div className={`${correct} note note-margin col-100 row justify-center-all`}>
                <h1 className="note-size remove-start-margin" id="pitch">
                  {`${this.closestNote ? this.closestNote : ''}`}
                  <span className="octave">{this.closestOctave}</span>
                </ h1>
              </div>
              <div className="row justify-center-all">
                <h3 className="remove-start-margin">{this.closestNoteFrequency ? `Note Freq: ${this.closestNoteFrequency}Hz` : 'Note Freq:'}</h3>
              </div>
              <div className="col-100 row justify-center-all">
                <p className="remove-start-margin" id="pitch">{this.state.currentFrequency ? `Current Freq: ${this.state.currentFrequency}Hz` : 'Current Freq: 0Hz'}</p>
              </div>
              <div className="col-100 row justify-center-all">
                <p className="remove-start-margin" id="clarity">{this.state.clarity ? `Voice Clarity: ${this.state.clarity}% ` : 'Voice Clarity: 0%'}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="note-margin col-100 row justify-center-all">
          <div className="pitch-buttons">
            <button className="button nice-button unicorn-barf gochi-hand sing"
              onClick={this.state.isOn ? this.stopMic : this.turnOnMic}>
              {this.state.isOn ? 'Stop!' : 'Sing!'}
            </button>
          </div>
          {this.state.isOn &&
            <div className="pitch-buttons">
              <button className="button nice-button unicorn-barf gochi-hand sing"
              onClick={this.matchPiano}>
                {this.state.tuneVoice ? 'Sing!' : 'Match!'}
              </button>
            </div>
          }
        </div>
        <div>
          <Piano callback={this.currentPianoKey} notes={this.state.notes} />
        </div>
        </>
        }
          <Footer />
        <div className="mobile-only footer-margin">
        </div>
      </div>
    );
  }
}
