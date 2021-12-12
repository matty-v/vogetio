import React from 'react';
import { GoogleLogin } from 'react-google-login';

const SERVER_URL = process.env.SERVER_URL;

import './BlogAdmin.css';

export class BlogAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSuccessfulLogin(response) {
    const profile = response.profileObj;
    const token = response.tokenObj;
    localStorage.setItem(
      'profile',
      JSON.stringify({
        name: profile.name,
        email: profile.email,
        imageUrl: profile.imageUrl
      })
    );
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('id_token', token.id_token);
  }

  handleFailedLogin(response) {
    console.error(response);
  }

  render() {
    return (
      <>
        <h1>Blog Admin Page</h1>
        <GoogleLogin
          clientId="201158295757-htjqqof4vmb4dfedlnaul2l2vovv7vr7.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={this.handleSuccessfulLogin}
          onFailure={this.handleFailedLogin}
          cookiePolicy={'single_host_origin'}
        />
      </>
    )
  }

}
