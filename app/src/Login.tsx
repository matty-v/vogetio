import Link from '@mui/material/Link';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { setLogin, getUser } from './auth-service';

export function Login() {

  const [user, setUser] = useState(getUser());

  const handleLogin = (res: any) => {
    setLogin(res.profileObj, res.tokenObj);
    setUser(getUser());
  };

  return (
    <>
    {user
      ? // Logged In
        <div>
          <h1>Hello {user.profile.name}!</h1>
          <Link href="/blog-admin">Go to blog admin</Link>
        </div>
      : // Logged Out
        <GoogleLogin
          clientId="201158295757-htjqqof4vmb4dfedlnaul2l2vovv7vr7.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={(res) => console.error(res)}
          cookiePolicy={'single_host_origin'}
        />
    }
    </>
  )
}
