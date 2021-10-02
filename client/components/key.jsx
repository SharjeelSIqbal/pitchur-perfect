import React from 'react';

export default class Keys extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      currentKey: {}
    };
    this.playKey = this.playKey.bind(this);
  }

  playKey(e) {
    const note = event.target.closest('button').id.split(' ')[0];
    const octave = event.target.closest('button').id.split(' ')[1];
    const frequency = event.target.closest('button').getAttribute('name');
    const currentKey = { note, octave, frequency };
    this.setState({ isPressed: true, currentKey }, () => {
      this.props.setKey(this.state.currentKey);
      const pressed = setTimeout(() => {
        this.setState({ isPressed: false }, () => clearTimeout(pressed));
      }, 200);

    });
    const time = 1;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const masterGain = audioContext.createGain();
    const gainNode = audioContext.createGain();
    const vibrato = audioContext.createOscillator();
    const vibratoGain = audioContext.createGain();

    vibrato.frequency.setValueAtTime(10, 5);
    vibratoGain.gain.setValueAtTime(10, 4);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(oscillator.frequency);
    oscillator.type = this.props.type;
    oscillator.frequency.value = this.props.note.frequency;
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(audioContext.destination);
    masterGain.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.25);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.35);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + time);
    vibrato.start();
  }

  render() {
    const key = this.props.note.note.length === 1 ? 'key' : 'key flat';
    const perfectKeys = this.props.note.note === 'C' || this.props.note.note === 'F' ? 'no-border-left' : null;
    return (
      <button className={`${key} ${perfectKeys} font-pair ${this.state.isPressed ? 'pressed' : null}` } name={this.props.note.frequency} id={`${this.props.note.note} ${this.props.note.octave}`} onClick={this.playKey}>
        <h3 className="absolute note-to-key ">{this.props.note.note.length === 1 ? `${this.props.note.note}${this.props.note.octave}` : null}</h3>
       </button>

    );
  }
}
