import React from 'react';

export default class Keys extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: 0
    };
    this.playKey = this.playKey.bind(this);

  }

  playKey(e) {
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
    oscillator.type = 'triangle';
    oscillator.frequency.value = this.props.note.frequency;
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(audioContext.destination);
    masterGain.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + time);
    vibrato.start();
  }

  render() {
    const key = this.props.note.note.length === 1 ? 'key' : 'key flat';
    const perfectKeys = this.props.note.note === 'C' || this.props.note.note === 'F' ? 'no-border-left' : null;
    return (
      <div className={`${key} ${perfectKeys} font-pair`} name={this.props.note.frequency} id={`${this.props.note.note}${this.props.note.octave}`} onClick={this.playKey}>
        <h3 className="absolute note-to-key ">{this.props.note.note.length === 1 ? `${this.props.note.note}${this.props.note.octave}` : null}</h3>
       </div>

    );
  }
}
