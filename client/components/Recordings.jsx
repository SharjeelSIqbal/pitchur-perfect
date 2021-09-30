import React from 'react';
export default class Recordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordings: [],
      formInputs: false,
      title: '',
      duration: 0
    };
    this.captureAudio = this.captureAudio.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.saveAudioToProfile = this.saveAudioToProfile.bind(this);
    this.discardAudio = this.discardAudio.bind(this);
    this.titleName = this.titleName.bind(this);
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm'
    });
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  titleName(e) {
    this.setState({ title: e.target.value });
  }

  startRecording(e) {
    e.preventDefault();
    this.setState({ recordings: null });
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true, formInputs: false, duration: 0 }, () => {
      this.startTime = Date.now();
    });
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.endTime = Math.floor((Date.now() - this.startTime) / 1000);
    this.setState({ recording: false, formInputs: true, duration: this.endTime });
    this.captureAudio();
  }

  captureAudio() {
    const blob = new Blob(this.chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    this.file = new File([blob], `${Date.now()}.webm`, { type: 'audio/webm' });
    this.setState({ recordings: audioURL, formButtons: false });
  }

  time(duration) {
    let secondsString = '';
    let minutesString = '';
    const seconds = duration % 60;
    if (seconds < 10) {
      secondsString = `0${seconds}`;
    } else if (seconds > 10) {
      secondsString = `${seconds}`;
    }
    const minutes = Math.trunc(duration / 60);
    if (minutes < 10) {
      minutesString = `0${minutes}`;
    } else {
      minutesString = `${minutes}`;
    }
    return `${minutesString}:${secondsString}`;
  }

  saveAudioToProfile(e) {

    e.preventDefault();
    const formData = new FormData();
    const userId = 1;
    const title = this.state.title;
    const recordingLength = this.state.duration;
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('recordingLength', this.time(recordingLength));
    formData.append('audio', this.file, this.file.name);
    fetch('/api/recordings', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        response.json();
        this.setState({ formInputs: false, recordings: [] });
      })
      .catch(err => console.error(err));
  }

  discardAudio(e) {
    e.preventDefault();
    this.setState({ recordings: [], title: '', formInputs: false });
  }

  render() {
    const { recordings, recording, formInputs } = this.state;
    const paddingBottom = formInputs ? 'padding-record' : '';
    const recordInner = (
            <div className="outer-record-shell row justify-center-all">
              <div className="inner-record-shell">
              </div>
            </div>
    );
    const recordButtonClassName = 'col-100 outline record-button row justify-center-all';

    return (
      <form onSubmit={this.saveAudioToProfile} action="submit" className="background-color">
          <div className="row justify-center-all">
            {formInputs &&
            <div className="padding-input">
            <input onChange={this.titleName} type="text" className="title-input" required/>
            </div>
            }
          </div>
        <div className="gochi-hand row justify-center-all ">
          {recording && <h1>Recording...</h1>}
        </div>
        <div className="row justify-center-all padding-record">
          {!recording && <button onClick={e => this.startRecording(e)} className={`${recordButtonClassName} shadow`}>{recordInner}</button>}
          {recording && <button onClick={e => this.stopRecording(e)} className={`${recordButtonClassName} shadow-pressed`}>{recordInner}</button>}
        </div>
        <div className={`row justify-center-all ${paddingBottom}`}>
        {formInputs && (
              <audio controls="controls">
                <source src={recordings} />
              </audio>
        )}
        </div>
        {formInputs && (
        <div className="button-container margin-0-auto">
          <div className="padding-button-bottom col-100 row justify-evenly">
            <div className="row justify-center-all col-50">
              <button className="button discard-button" onClick={this.discardAudio}>
                Discard
              </button>
            </div>
            <div className="col-50 row justify-center-all">
              <button className="button submit-button" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>)}
      </form>

    );
  }
}
