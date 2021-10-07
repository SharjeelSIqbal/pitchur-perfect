import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      failed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

  }

  handleSubmit(event) {
    event.preventDefault(event);
    this.setState({ loading: true });
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => this.setState({ loading: false }))
      .catch(err => {
        this.setState({ failed: true, loading: false });
        console.error(err);
      });
  }

  render() {
    return (
      <>
        {this.state.loading
          ? <div className="row justify-center-all padding-input absolute-loading">
            <div className="lds-facebook loading"><div></div><div></div><div></div></div>
          </div>
          : <form type="submit" onSubmit={this.handleSubmit} className="auth-form-container margin-0-auto">
          <div className="auth-div">
            <label htmlFor="username" className="gochi-hand label">
              Username
            </label>
          <div>
            <input type="text" onChange={this.handleChange} name="username" className="col-100 font-pair auth-input"/>
          </div>
        </div>

          <div className="auth-div">
          <label htmlFor="password" className="gochi-hand label">
            Password
          </label>
          <div>
            <input type="password" onChange={this.handleChange} name="password" className="col-100 font-pair auth-input" />
          </div>
          </div>
        <div className="auth-div row justify-between sign-in-space">
          <a href=""className="sign-up-in-a-tag">Have an account? Sign-in instead.</a>
          <input className="button auth-button gochi-hand" type="submit" value="Sign-Up" />
        </div>
      </form>
  }
      </>
    );
  }
}
