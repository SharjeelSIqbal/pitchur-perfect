import React from 'react';
import Recorder from '../components/recordings';
import Footer from '../components/footer';
import Header from '../components/header';
// coment to push deployment;
export default function Home(props) {

  return (
  <div>
    <div>
      <Header />
      <Recorder />
    </div>
    <div className="footer-margin mobile-only">
    <Footer />
    </div>
  </div>

  );
}
