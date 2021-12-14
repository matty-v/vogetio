import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { setLogin } from './auth-service';

export function Login(props: any) {

  const handleLogin = (res: any) => {
    setLogin(res.profileObj, res.tokenObj);
    props.rerenderParentCallback();
  };

  return (
    <GoogleLogin
      clientId="201158295757-htjqqof4vmb4dfedlnaul2l2vovv7vr7.apps.googleusercontent.com"
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={(res) => console.error(res)}
      cookiePolicy={'single_host_origin'}
    />
  )
}
