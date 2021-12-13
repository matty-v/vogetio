import React from 'react';
import { Login } from './Login';

const SERVER_URL = process.env.SERVER_URL;

import './BlogAdmin.css';
import { getUser } from './auth-service';

export class BlogAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getUser()
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSuccessfulLogin() {
    console.log('refreshing user');
    this.setState({
      user: getUser()
    });
  }

  render() {
    return (
      <>
        <h1>Blog Admin Page</h1>
        {this.state.user
          ? // Logged In
          <div id="logged-in-content">
            <div className="row">
              <p>Hello {this.state.user.profile.name}!</p>
            </div>
            <div className="row">
              <button>Create Post</button>
            </div>
          </div>

          : // Logged Out
          <Login rerenderParentCallback={this.handleSuccessfulLogin} />
        }
      </>
    )
  }

}
