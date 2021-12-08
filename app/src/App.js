import React from "react";
import './App.css';
const SERVER_URL = process.env.SERVER_URL;

export default function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${SERVER_URL}/api/users`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <>
      <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <span id="app-title" class="mdc-top-app-bar__title">voget.io</span>
          </section>
          <section id="contact-icons" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <a href="https://github.com/matty-v" class="fa fa-github"></a>
            <a href="https://www.linkedin.com/in/matthew-voget-47a225a1" class="fa fa-linkedin"></a>
            <a href="mailto: matt.voget@gmail.com" class="fa fa-envelope"></a>
          </section>
        </div>
      </header>
      <main class="mdc-top-app-bar--fixed-adjust">
        <div className="App">
          <div class="container">
            <div id="" class="row">
              <div id="profile-pic" class="col">
                <img src="assets/profile-pic.jpeg" alt="Profile"/>
              </div>
              <div class="col">
                <div id="about-me-content">
                  <div><i class="fa fa-code"></i>Full Stack Engineer</div>
                  <div><i class="fa fa-users"></i>Team Lead</div>
                  <div><i class="fa fa-heart"></i>Dad</div>
                </div>

              </div>
              <div id="hello-content" class="col">
                <div id="hello-text">
                  Hello, World!
                </div>
                <div id="hello-subtext">
                  You've found Matt Voget's personal site
                </div>
              </div>
            </div>
            <div class="row content-row">
              <div class="col">
              </div>
            </div>
          </div>
        </div>
      </main>
</>
  );
}
