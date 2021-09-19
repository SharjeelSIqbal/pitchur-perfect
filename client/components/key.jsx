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

    oscillator.type = 'triangle';
    oscillator.frequency.value = this.props.note.frequency;
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(audioContext.destination);
    masterGain.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + time);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + time);
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
