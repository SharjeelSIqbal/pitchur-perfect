import React, { useState } from 'react';

export default function RecordingView(props) {
  let recordedDate = props.recording.recordedAt.slice(0, 10);
  recordedDate = recordedDate.split('-').join('/');
  const [chosen, setChosen] = useState(false);
  const audioClassName = chosen ? 'openAudio' : 'closeAudio';

  return (
    <div className="view-container margin-0-auto font-pair wrap-container">
      <div className="col-100 margin-0-auto">
        <div className="recording-view-container" onClick={() => setChosen(!chosen)}>
          <div className="pointer row justify-between">
            <h1 className="remove-start-margin">{props.recording.title}</h1>
          </div>
          <div className="row justify-between">
            <h3>{`${recordedDate}`}</h3>
            <h3>{props.recording.recordingLength}</h3>
          </div>
          <div className={`${audioClassName} row justify-center-all`}>
            <audio controls src={`${props.recording.url}`} type="audio/webm" preload="auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
