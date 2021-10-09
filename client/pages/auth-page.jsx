import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import AuthForm from '../components/auth-form';
export default class AuthPage extends React.Component {
  render() {
    return (
      <>
        <Header/>
         <AuthForm />
        <Footer />
      </>
    );
  }
}
