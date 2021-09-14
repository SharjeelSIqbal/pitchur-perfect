import React from 'react';

export default function Header() {

  return (
  <>
  <header className="mobile-only header-border-bottom">
    <div className="col-100 row justify-center-all gochi-hand white-font title-font-size margin-reset">
      <h1 className="title remove-start-margin">Pitchur Perfect</h1>
    </div>
    <div className=" col-100 row justify-center-all white-font font-pair">
      <h3>Capture your perfect sound</h3>
    </div>
  </header>

  <nav className="desktop-only desktop-only-row">
  <div className="row nav-color">
    <div className="desktop-only-header gochi-hand white-font col-50 title-font-size">
      <h1>Pitchur Perfect</h1>
    </div>
    <div className="row justify-evenly col-50">
      <svg width="35" height="35" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 0V14.6528C9.4675 14.1806 8.2775 13.8889 7 13.8889C3.1325 13.8889 0 16.375 0 19.4444C0 22.5139 3.1325 25 7 25C10.8675 25 14 22.5139 14 19.4444V5.55556H21V0H10.5Z" fill="black" fillOpacity="0.65"/>
      </svg>
      <a href="#view">
      <svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 12.5C15.9531 12.5 18.75 9.70312 18.75 6.25C18.75 2.79688 15.9531 0 12.5 0C9.04688 0 6.25 2.79688 6.25 6.25C6.25 9.70312 9.04688 12.5 12.5 12.5ZM12.5 15.625C8.32812 15.625 0 17.7188 0 21.875V25H25V21.875C25 17.7188 16.6719 15.625 12.5 15.625Z" fill="black" fillOpacity="0.65" />
      </svg>
      </a>
      <svg width="35" height="35" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.9256e-08 7.87635C-0.000153728 6.8298 0.178494 5.79372 0.525504 4.82865C0.872513 3.86358 1.38092 2.98888 2.02102 2.25568C2.66111 1.52248 3.42005 0.945488 4.25348 0.558419C5.08691 0.171349 5.97811 -0.01803 6.875 0.00135052C7.9362 -0.00522436 8.98649 0.25141 9.95624 0.754245C10.926 1.25708 11.7931 1.99463 12.5 2.91802C13.2069 1.99463 14.074 1.25708 15.0438 0.754245C16.0135 0.25141 17.0638 -0.00522436 18.125 0.00135052C19.0219 -0.01803 19.9131 0.171349 20.7465 0.558419C21.58 0.945488 22.3389 1.52248 22.979 2.25568C23.6191 2.98888 24.1275 3.86358 24.4745 4.82865C24.8215 5.79372 25.0002 6.8298 25 7.87635C25 15.6872 17.0263 21.5847 12.5 26.2514C7.98375 21.5453 9.9256e-08 15.693 9.9256e-08 7.87635Z" fill="black" fillOpacity="0.65" />
      </svg>
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
