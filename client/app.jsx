import React from 'react';
import View from './pages/view';
import Home from './pages/home';
import Pitch from './pages/pitch';
import parseRoute from './lib/parse-route';
import AuthPage from './pages/auth-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'view') {
      return <View />;
    }
    if (route.path === 'pitch') {
      return <Pitch />;
    }
  }

  render() {
    return (
    <>

    <div className="container-background-color">
      <AuthPage />
    {/* {this.renderPage()} */}
    </div>
    </>
    );
  }
}
