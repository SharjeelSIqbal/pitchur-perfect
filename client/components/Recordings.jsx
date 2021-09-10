import React from 'react';
export default class Recordings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordings: [],
      formInputs: false,
      title: '',
      length: '00:32'
    };
    this.saveAudio = this.saveAudio.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    // this.saveAudioToProfile = this.saveAudioToProfile.bind(this);
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
    this.setState({ recording: true, formInputs: false });
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({ recording: false, formInputs: true });
    this.saveAudio();
  }

  saveAudio() {
    const blob = new Blob(this.chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(blob);
    // To save multiple audio files
    // const recordings = this.state.recordings.concat([audioURL]);
    this.setState({ recordings: [audioURL], formButtons: false });

  }

  // saveAudioToProfile(){
  //   const userId = 1;
  //   const fileName = title.split(' ').join('-');
  //   const title = this.state.title;
  //   const length = this.state.length;
  //   const url = `/voice/${fileName}`;

  //   const params = [userId, fileName, title, length];
  //   const sql = `
  //   insert into "recordings" ("userId", "url", "title", "recordingLength")
  //   values ($1, $2, $3, $4)
  //   `
  // }

  deleteAudio(audioUrl) {
    const recordings = this.state.recordings.filter(audio => audio !== audioUrl);
    this.setState({ recordings });
  }

  render() {
    const { recordings, recording, formInputs } = this.state;
    // const submitButtons = (
    //   <div>
    //     <button onSubmit={this.superSaveAudio}></button>
    //   </div>
    // )
    const recordInner = (
            <div className="outer-record-shell row justify-center-all">
              <div className="inner-record-shell">
              </div>
            </div>
    );
    const buttonClassName = 'col-100 outline record-button row justify-center-all';

    return (
      <form action="submit">
          <div className="row justify-center-all">
            {formInputs &&
            <div className="padding-input">
            <input type="text" className="title-input" />
            </div>
            }
          </div>
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
      </form>

    );
  }
}
