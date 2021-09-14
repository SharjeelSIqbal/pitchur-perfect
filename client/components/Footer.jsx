import React from 'react';

export default function Footer(props) {
  return (
    <footer className={`mobile-only fixed background-color-white ${props.showFooter}`}>
      <div className="row justify-evenly col-100">
        <svg width="30" height="30" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 0V14.6528C9.4675 14.1806 8.2775 13.8889 7 13.8889C3.1325 13.8889 0 16.375 0 19.4444C0 22.5139 3.1325 25 7 25C10.8675 25 14 22.5139 14 19.4444V5.55556H21V0H10.5Z" fill="black" fillOpacity="0.54" />
        </svg>
        <a href="#">
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31" cy="31" r="31" fill="#C0CEFF" />
          <circle cx="31" cy="31" r="27" fill="url(#paint0_linear)" />
          <circle cx="31.5" cy="30.5" r="11.5" fill="#FF3434" />
          <defs>
            <linearGradient id="paint0_linear" x1="31" y1="4" x2="31" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0.0520833" stopColor="#0094F5" />
              <stop offset="0.260417" stopColor="#6966FF" />
              <stop offset="0.442708" stopColor="#8E66FF" />
              <stop offset="0.625" stopColor="#C566FF" />
              <stop offset="0.802083" stopColor="#D766FF" />
              <stop offset="0.963542" stopColor="#FC66FF" />
            </linearGradient>
          </defs>
        </svg>
        </a>
        <a href="#view">
        <svg width="35" height="45" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 12.5C15.9531 12.5 18.75 9.70312 18.75 6.25C18.75 2.79688 15.9531 0 12.5 0C9.04688 0 6.25 2.79688 6.25 6.25C6.25 9.70312 9.04688 12.5 12.5 12.5ZM12.5 15.625C8.32812 15.625 0 17.7188 0 21.875V25H25V21.875C25 17.7188 16.6719 15.625 12.5 15.625Z" fill="#757575" />
        </svg>
        </a>
     </div>
    </footer>
  );
}
