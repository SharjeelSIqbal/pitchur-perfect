import React from 'react';
import ViewRecording from '../components/viewRecording';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      recordings: []
    };
    this.deleteRecording = this.deleteRecording.bind(this);
    this.favoriteRecording = this.favoriteRecording.bind(this);
  }

  deleteRecording(id) {
    fetch(`/api/recordings/${id}`, {
      method: 'DELETE'
    })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch(`/api/recordings/${1}`)
      .then(response => response.json())
      .then(recordings => this.setState({ recordings, loading: false }))
      .catch(err => console.error(err));
  }

  favoriteRecording(recordingId, favorite) {
    fetch(`/api/recordings/${recordingId}`, {
      method: 'PATCH',
      body: favorite,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>

        <div className="background-color">
          <Header />
          {this.state.loading &&
            <div className="row justify-center-all padding-input">
              <div className="lds-facebook loading"><div></div><div></div><div></div></div>
            </div>
          }
          {this.state.recordings.length === 0 && this.state.loading === false && <h2 className="font-pair text-align-center no-recordings">No recordings found, please make a new recording.</h2>}
          <div className="row wrap margin-0-auto">
            { this.state.recordings.map(element => {
              return (
                  <ViewRecording favoriteRecording={this.favoriteRecording} deleteView={this.deleteRecording} key={element.url} recording={element} />
              );
            })
            }
          </div>
        </div>
        <div className="mobile-only footer-margin">
          <Footer showFooter="hide" />
        </div>
      </>
    );
  }
}
