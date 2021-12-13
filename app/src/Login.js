import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { setLogin } from './auth-service';

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLoginSuccess(res) {
    setLogin(res.profileObj, res.tokenObj)
    this.props.rerenderParentCallback();
  }

  render() {
    return (
      <GoogleLogin
        clientId="201158295757-htjqqof4vmb4dfedlnaul2l2vovv7vr7.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={this.handleLoginSuccess}
        onFailure={(res) => console.error(res)}
        cookiePolicy={'single_host_origin'}
      />
    )
  }

}
