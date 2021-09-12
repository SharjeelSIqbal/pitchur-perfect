import React from 'react';
export default class Recordings extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.form = React.createRef();
    this.state = {
      recording: false,
      recordings: [],
      formInputs: false,
      title: '',
      duration: 0
    };
    this.saveAudio = this.saveAudio.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
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
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true, formInputs: false, duration: 0 }, () => {
      this.time = setInterval(() => this.setState({ duration: this.state.duration + 1 }), 1000);
    });
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    clearInterval(this.time);
    this.setState({ recording: false, formInputs: true });
    this.saveAudio();
  }

  saveAudio() {
    const blob = new Blob(this.chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    this.file = new File([blob], 'audio', { type: 'audio/webm' });
    this.setState({ recordings: [audioURL], formButtons: false });
  }

  saveAudioToProfile(e) {
    e.preventDefault();
    const formData = new FormData();
    const userId = 1;
    const title = this.state.title;
    const fileName = title.split(' ').join('-');
    const url = `/voice/${fileName}`;
    const recordingLength = this.state.duration;
    formData.append('userId', userId);
    formData.append('url', url);
    formData.append('title', title);
    formData.append('recordingLength', recordingLength);
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

  deleteAudio(audioUrl) {
    const recordings = this.state.recordings.filter(audio => audio !== audioUrl);
    this.setState({ recordings });
  }

  render() {
    const { recordings, recording, formInputs } = this.state;
    const recordInner = (
            <div className="outer-record-shell row justify-center-all">
              <div className="inner-record-shell">
              </div>
            </div>
    );
    const recordButtonClassName = 'col-100 outline record-button row justify-center-all';
    const submitButton = (
      <button type="submit">
        Submit
      </button>
    );
    const discardButton = (
      <button onClick={this.discardAudio}>
        Discard
      </button>
    );
    return (
      <form onSubmit={this.saveAudioToProfile} action="submit" ref={this.form}>
          <div className="row justify-center-all">
            {formInputs &&
            <div className="padding-input">
            <input onChange={this.titleName} type="text" className="title-input" required/>
            </div>
            }
          </div>
        {recording && <div><h3>Seconds: {this.state.duration}</h3></div>}
        <div className="row justify-center-all padding-record">
          {!recording && <button onClick={e => this.startRecording(e)} className={recordButtonClassName}>{recordInner}</button>}
          {recording && <button onClick={e => this.stopRecording(e)} className={recordButtonClassName}>{recordInner}</button>}
        </div>
        <div className="row justify-center-all padding-record">
        {recordings.map(audioURL => (
          <div key={audioURL}>
              <audio controls="controls" ref={this.audio}>
                <source src={audioURL} />
              </audio>
          </div>
        )
        )}
        </div>
        <div className="row jusitfy-evenly">
        {formInputs && submitButton}
        {formInputs && discardButton}
        </div>
      </form>

    );
  }
}
