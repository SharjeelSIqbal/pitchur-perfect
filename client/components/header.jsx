import React from 'react';

export default function Header() {

  return (
  <>
  <header className="mobile-only header-border-bottom">
    <div className="col-100 row justify-center-all gochi-hand white-font title-font-size margin-reset">
      <h1 className="title remove-start-margin">Pitchur Perfect</h1>
    </div>
    <div className=" col-100 row justify-center-all white-font font-pair">
      <h3 className="remove-start-margin">Capture your perfect sound</h3>
    </div>
  </header>

  <nav className="desktop-only desktop-only-row">
  <div className="row nav-color">
    <div className="desktop-only-header gochi-hand white-font col-50 title-font-size">
      <h1 className="remove-start-margin small-padding">Pitchur Perfect</h1>
    </div>
    <div className="row justify-evenly col-50">
      <a href="#pitch">
      <svg width="35" height="35" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 0V14.6528C9.4675 14.1806 8.2775 13.8889 7 13.8889C3.1325 13.8889 0 16.375 0 19.4444C0 22.5139 3.1325 25 7 25C10.8675 25 14 22.5139 14 19.4444V5.55556H21V0H10.5Z" fill="black" fillOpacity="0.65"/>
      </svg>
      </a>
      <a href="#view">
      <svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 12.5C15.9531 12.5 18.75 9.70312 18.75 6.25C18.75 2.79688 15.9531 0 12.5 0C9.04688 0 6.25 2.79688 6.25 6.25C6.25 9.70312 9.04688 12.5 12.5 12.5ZM12.5 15.625C8.32812 15.625 0 17.7188 0 21.875V25H25V21.875C25 17.7188 16.6719 15.625 12.5 15.625Z" fill="black" fillOpacity="0.65" />
      </svg>
      </a>
      <a href="#">
      <svg width="25" height="40" viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 27.5C16.2656 27.5 19.3182 24.1422 19.3182 20V7.5C19.3182 3.35781 16.2656 0 12.5 0C8.73437 0 5.68182 3.35781 5.68182 7.5V20C5.68182 24.1422 8.73437 27.5 12.5 27.5ZM23.8636 15H22.7273C22.0994 15 21.5909 15.5594 21.5909 16.25V20C21.5909 25.8438 17.0107 30.5328 11.5916 29.9516C6.86861 29.4445 3.40909 24.7742 3.40909 19.5547V16.25C3.40909 15.5594 2.90057 15 2.27273 15H1.13636C0.508523 15 0 15.5594 0 16.25V19.3875C0 26.3906 4.54332 32.6336 10.7955 33.582V36.25H6.81818C6.19034 36.25 5.68182 36.8094 5.68182 37.5V38.75C5.68182 39.4406 6.19034 40 6.81818 40H18.1818C18.8097 40 19.3182 39.4406 19.3182 38.75V37.5C19.3182 36.8094 18.8097 36.25 18.1818 36.25H14.2045V33.6117C20.2919 32.693 25 26.9453 25 20V16.25C25 15.5594 24.4915 15 23.8636 15Z" fill="black" fillOpacity="0.65" />
      </svg>
      </a>
    </div>
  </div>
  </nav>
  </>

  );
}
