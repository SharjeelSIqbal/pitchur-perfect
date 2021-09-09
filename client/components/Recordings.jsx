import React from 'react';

export default class Recordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordings: []
    };
    this.saveAudio = this.saveAudio.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
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

  startRecording(e) {
    e.preventDefault();
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveAudio();
  }

  saveAudio() {
    const blob = new Blob(this.chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    const recordings = this.state.recordings.concat([audioURL]);
    this.setState({ recordings });
  }

  deleteAudio(audioUrl) {
    const recordings = this.state.videos.filter(audio => audio !== audioUrl);
    this.setState({ recordings });
  }

  render() {
    const { recordings, recording } = this.state;
    const recordInner = (
            <div className="outer-record-shell row justify-center-all">
              <div className="inner-record-shell">
              </div>
            </div>
    );
    const buttonClassName = 'col-100 outline record-button row justify-center-all';

    return (
      <>
        <div className="row justify-center-all padding-record">
          {!recording && <button onClick={e => this.startRecording(e)} className={buttonClassName}>{recordInner}</button>}
          {recording && <button onClick={e => this.stopRecording(e)} className={buttonClassName}>{recordInner}</button>}
        </div>
        <div className="row justify-center-all padding-record">
          {recordings.map(audioURL => (
            <div key={audioURL}>
              <audio controls="controls">
                <source src={audioURL} />
              </audio>
            </div>
          )
          )}
        </div>

      </>
    );
  }
}
