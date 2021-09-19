import React from 'react';
import { PitchDetector } from 'pitchy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Piano from '../components/piano';

export default class Pitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrequency: null,
      notes: null,
      isOn: false
    };
    this.closestNote = null;
    this.closestOctave = null;
    this.closestNoteFrequency = null;
    this.closestHit = false;

    this.updatePitch = this.updatePitch.bind(this);
    this.turnOnMic = this.turnOnMic.bind(this);
    this.stopMic = this.stopMic.bind(this);
  }

  async componentDidMount() {
    await fetch('/api/notes')
      .then(response => response.json())
      .then(result => this.setState({ notes: result }))
      .catch(err => console.error(err));
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

  stopMic(e) {
    this.setState({ isOn: false });
  }

  measureFrequency() {
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
          }, () => this.measureFrequency());
          this.updatePitch(analyserNode, detector, input, sampleRate);
        },
        100
      );
    }
  }

  render() {
    const correct = this.closestHit ? 'correct' : null;
    return (
      <div>
        <Header />
        <div className="row justify-center-all padding-input">
          <div className="row justify-center-all background-pitch">
          <div className="background-pitch-inner row justify-center-all font-pair">
            <div>
                <div className={`${correct} note-margin col-100 row justify-center-all`}>
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
          <button className="button nice-button unicorn-barf gochi-hand sing" onClick={this.state.isOn ? this.stopMic : this.turnOnMic}>SING!</button>
        </div>
        <div>
          <Piano notes={this.state.notes} />
        </div>
        <div className="footer-margin">
          <Footer />
        </div>
      </div>
    );
  }
}
