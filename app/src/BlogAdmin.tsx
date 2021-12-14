import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import { Login } from './Login';

const SERVER_URL = process.env.SERVER_URL;

import './BlogAdmin.css';
import { getUser } from './auth-service';

export function BlogAdmin() {

  let [user, setUser]: any = useState();

  const navigate = useNavigate();

  user = getUser();

  const test = () => {
    navigate('/post-editor?postId=create');
  };

  return (
    <>
      <h1>Blog Administration</h1>
      {user
        ? // Logged In
        <div id="logged-in-content">
          <div className="row">
            <p>Hello {user.profile.name}!</p>
          </div>
          <div className="row">
            <div className="col">
              <Button variant="contained" onClick={test}>Create Post</Button>
            </div>
          </div>
        </div>

        : // Logged Out
        <div id="login-link">
          <Login rerenderParentCallback={() => setUser(getUser())} />
        </div>
      }
    </>
  )
}
