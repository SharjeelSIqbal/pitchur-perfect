import React from 'react';
import { PitchDetector } from 'pitchy';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Pitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrequency: null,
      isOn: false,
      audioContext: null
    };

    this.updatePitch = this.updatePitch.bind(this);
    this.turnOnMic = this.turnOnMic.bind(this);
  }

  async turnOnMic(e) {
    this.setState({ isOn: !this.state.isOn });
    const audioContext = new AudioContext();
    this.setState({ audioContext });
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

  updatePitch(analyserNode, detector, input, sampleRate) {
    if (this.state.isOn) {
      analyserNode.getFloatTimeDomainData(input);
      const [pitch, clarity] = detector.findPitch(input, sampleRate);
      this.setState({
        currentFrequency: Math.round(pitch * 10) / 10,
        clarity: Math.round(clarity * 100)
      });
      setTimeout(
        () => this.updatePitch(analyserNode, detector, input, sampleRate),
        100
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
          <div className="col-100 row justify-center-all">
           <button onClick={this.state.isOn ? null : this.turnOnMic}>Start singing!</button>
          </div>
          <div className="col-100 row justify-center-all">
            <h1 id="pitch">{this.state.currentFrequency ? `${this.state.currentFrequency}Hz` : 'Hz'}</h1>
          </div>
          <div className="col-100 row justify-center-all">
            <h1 id="clarity">{this.state.clarity ? `${this.state.clarity}% ` : 'clarity'}</h1>
          </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
