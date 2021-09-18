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
    const duration = 1;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    oscillator.type = 'triangle';
    oscillator.frequency.value = this.props.note.frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

  }

  render() {

    const key = this.props.note.note.length === 1 ? 'key' : 'key flat';
    return (

      <div className={`${key} font-pair`} name={this.props.note.frequency} id={`${this.props.note.note}${this.props.note.octave}`} onClick={this.playKey}>
        <h3 className="absolute note-to-key ">{this.props.note.note.length === 1 ? this.props.note.note : null}</h3>
       </div>

    );
  }
}
