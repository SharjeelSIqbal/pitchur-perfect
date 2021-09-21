import React, { useState } from 'react';

export default function RecordingView(props) {
  let recordedDate = props.recording.recordedAt.slice(0, 10);
  recordedDate = recordedDate.split('-').join('/');
  const [chosen, setChosen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFavorited, setFavorited] = useState(props.recording.favorite);
  const audioClassName = chosen ? 'openAudio' : 'closeAudio';
  return (
    <>
    {!isDeleted &&
     <>
      <div className={'view-container margin-0-auto font-pair wrap-container'}>
      <div className="col-100 margin-0-auto">
        <div className="recording-view-container" >
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
              <a onClick={e => {
                e.preventDefault();
                props.deleteView(props.recording.recordingId);
                setIsDeleted(true);
              }}>
                <svg width="30" height="25" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.25 0V1.25H0V3.75H1.25V20C1.25 20.663 1.51339 21.2989 1.98223 21.7678C2.45107 22.2366 3.08696 22.5 3.75 22.5H16.25C16.913 22.5 17.5489 22.2366 18.0178 21.7678C18.4866 21.2989 18.75 20.663 18.75 20V3.75H20V1.25H13.75V0H6.25ZM6.25 6.25H8.75V17.5H6.25V6.25ZM11.25 6.25H13.75V17.5H11.25V6.25Z" fill="#F24E1E" />
                </svg>
              </a>

              <a onClick={ e => {
                setFavorited(!isFavorited);
                props.favoriteRecording(props.recording.recordingId, JSON.stringify({ isFavorite: !isFavorited }));
              }
              }>
              {isFavorited
                ? <svg width="30" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4997 2.05321C19.434 -5.07492 36.7715 7.39852 12.4997 23.4376C-11.7722 7.40008 5.56529 -5.07492 12.4997 2.05321Z" fill="#DC3545" />
                  </svg>
                : <svg width="30" height="25" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.9999 2.74805L7.2829 2.01105C5.5999 0.281049 2.51389 0.878049 1.39989 3.05305C0.876895 4.07605 0.758895 5.55305 1.71389 7.43805C2.63389 9.25305 4.5479 11.427 7.9999 13.795C11.4519 11.427 13.3649 9.25305 14.2859 7.43805C15.2409 5.55205 15.1239 4.07605 14.5999 3.05305C13.4859 0.878049 10.3999 0.280049 8.7169 2.01005L7.9999 2.74805ZM7.9999 15C-7.33311 4.86805 3.27889 -3.03995 7.82389 1.14305C7.88389 1.19805 7.9429 1.25505 7.9999 1.31405C8.05632 1.2551 8.11503 1.19839 8.17589 1.14405C12.7199 -3.04195 23.3329 4.86705 7.9999 15Z" fill="#DC3545" />
                  </svg>
                }
              </a>
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
