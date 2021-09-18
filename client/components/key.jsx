import React from 'react';

export default class Keys extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: 0
    };
    this.playKey = this.playKey.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.stopDuration = this.stopDuration.bind(this);

  }

  playKey(e) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(this.props.note, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    const playTime = setTimeout(() => {
      oscillator.stop();
      clearTimeout(playTime);
    }, this.state.pressed);
  }

  setDuration(e) {
    this.setState({ pressed: Math.floor(Date.now() / 1000) }, () => {
      // console.log(Math.floor(Date.now()) / 1000);
      // console.log(this.state.pressed);
    });
  }

  stopDuration(e) {
    // const pressed = Math.floor(Date.now() / 1000) - this.state.pressed;
    // this.setState({pressed}, () => {

    // });
  }

  render() {
    return (
        <>
       <div className="key"></div>
       </>
    );
  }
}
