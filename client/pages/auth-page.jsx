import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
// import Redirect from '../components/redirect';
// import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';
export default class AuthPage extends React.Component {
  render() {
    // const { user, route, handleSignIn } = this.context;
    // if (user) return <Redirect to="view" />;

    // const welcomeMessage = 'Please sign in to continue';
    return (
      <>
        <Header/>

         <AuthForm />

        <Footer />
      </>
    );
  }
}
