import React, { useState } from 'react';
import Favorite from './favorited';

export default function RecordingView(props) {
  let recordedDate = props.recording.recordedAt.slice(0, 10);
  recordedDate = recordedDate.split('-').join('/');
  const [chosen, setChosen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const audioClassName = chosen ? 'openAudio' : 'closeAudio';
  return (

    <>

    {!isDeleted &&
     <>
      <div className={'view-container margin-0-auto font-pair wrap-container'}>
      <div className="col-100 margin-0-auto">
        <div className="recording-view-container" >
              <div className={`absolute-indicator ${chosen && 'turn-around'}`}>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 21.9167C17.253 21.9167 21.9167 17.253 21.9167 11.5C21.9167 5.74707 17.253 1.08337 11.5 1.08337C5.74707 1.08337 1.08337 5.74707 1.08337 11.5C1.08337 17.253 5.74707 21.9167 11.5 21.9167Z" stroke="#4C4F9C" strokeWidth="2.08333" />
                  <path d="M7.33337 9.9375L11.5 14.1042L15.6667 9.9375" stroke="#4C4F9C" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
          <div onClick={() => setChosen(!chosen)}>
            <div className="pointer row justify-between">
               <h1 className="remove-start-margin">{props.recording.title}</h1>
            </div>
            <div className="row justify-between">
              <h3>{`${recordedDate}`}</h3>
              <h3>{props.recording.recordingLength}</h3>
            </div>
          </div>
          <div className={`${audioClassName} `}>
            <div className={'row justify-center-all'}>
              <audio controls src={`${props.recording.url}`} type="audio/webm" preload="auto" />
            </div>
            <div className="row justify-between favorite-trash">
              <svg onClick={ () => {
                props.deleteView(props.recording.recordingId);
                setIsDeleted(true);
              }} width="30" height="25" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.25 0V1.25H0V3.75H1.25V20C1.25 20.663 1.51339 21.2989 1.98223 21.7678C2.45107 22.2366 3.08696 22.5 3.75 22.5H16.25C16.913 22.5 17.5489 22.2366 18.0178 21.7678C18.4866 21.2989 18.75 20.663 18.75 20V3.75H20V1.25H13.75V0H6.25ZM6.25 6.25H8.75V17.5H6.25V6.25ZM11.25 6.25H13.75V17.5H11.25V6.25Z" fill="#F24E1E" />
              </svg>
              <Favorite favorited={props.favoriteRecording} isLiked={props.recording.favorite} id={props.recording.recordingId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}
    </>
  );
}
