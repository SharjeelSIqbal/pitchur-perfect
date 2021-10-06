import React from 'react';
// import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handleSubmit(event) {
  //   event.preventDefault(event);
  //   const { action } = this.props;
  //   const req = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   };
  //   fetch(`/api/auth/${action}`, req)
  //     .then(res => res.json())
  //     .then(result => {
  //       if (action === 'sign-up') {
  //         window.location.hash = 'sign-in';
  //       } else if (result.user && result.token) {
  //         this.props.onSignIn(result);
  //       }
  //     });
  // }

  render() {
    // const { action } = this.props;
    // const { handleChange, handleSubmit } = this;
    // const alternateActionHref = action === 'sign-up'
    //   ? '#sign-in'
    //   : '#sign-up';
    // const alternateActionText = action === 'sign-up'
    //   ? 'Sign in instead'
    //   : 'Register now';
    // const submitButtonText = action === 'sign-up'
    //   ? 'Register'
    //   : 'Log in';
    return (
      <form className="auth-form-container margin-0-auto">
          <div className="auth-div">
            <label htmlFor="username" className="gochi-hand label">
              Username
            </label>
          <div>
            <input type="text" className="col-100 font-pair auth-input"/>
          </div>
        </div>

          <div className="auth-div">
          <label htmlFor="password" className="gochi-hand label">
            Password
          </label>
          <div>
            <input type="password" className="col-100 font-pair auth-input" />
          </div>
          </div>
        <div className="auth-div row justify-between sign-in-space">
          <a href=""className="sign-up-in-a-tag">Have an account? Sign-in instead.</a>
          <input className="button auth-button gochi-hand" type="submit" value="Sign-Up" />
        </div>
      </form>
    );
  }
}
