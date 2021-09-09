import React from 'react';
import Recorder from '../components/Recordings';
import Footer from '../components/Footer';
import Header from '../components/Header';
export default function Home(props) {

  return (
  <div>

    <div className="background-color">
      <Header />
      <Recorder />
    </div>
    <Footer />
  </div>

  );
}
