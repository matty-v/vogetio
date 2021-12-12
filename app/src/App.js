import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { BlogAdmin } from './BlogAdmin';
import { Home } from './Home';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <header className="mdc-top-app-bar">
          <div className="mdc-top-app-bar__row">
            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <span id="app-title" className="mdc-top-app-bar__title"><img id="v-logo" src="assets/v-logo-white.png"></img>voget.io</span>
            </section>
            <section id="contact-icons" className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <a href="https://github.com/matty-v" className="fa fa-github"></a>
              <a href="https://www.linkedin.com/in/matthew-voget-47a225a1" className="fa fa-linkedin"></a>
              <a href="mailto: matt.voget@gmail.com" className="fa fa-envelope"></a>
            </section>
          </div>
        </header>
        <main className="mdc-top-app-bar--fixed-adjust">
          <div className="App">
            <div className="container">
              <Router>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/blog-admin" element={<BlogAdmin/>}/>
                </Routes>
              </Router>
            </div>
          </div>
        </main>
      </>
    )
  }
}
