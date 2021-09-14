import React from 'react';
import ViewRecording from '../components/viewRecording';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAudio: false,
      recordings: []
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    fetch(`/api/recordings/${1}`)
      .then(response => response.json())
      .then(recordings => this.setState({ recordings }))
      .catch(err => console.error(err));
  }

  handleScroll(e) {

  }

  render() {

    return (
      <>
        <div className="background-color">
          <Header />
          <div className="row wrap margin-0-auto">
          {this.state.recordings.map(element => {
            return (
              <ViewRecording key={element.url} recording={element} />
            );
          })
          }
          </div>
        </div>
        <div>
          <Footer showFooter="hide"/>
        </div>
      </>
    );
  }
}
