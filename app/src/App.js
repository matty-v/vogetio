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
    <div className="App">
      <div class="container">
        <div class="row">
          <div id="profile-pic" class="col">
            <img src="assets/profile-pic.jpeg" alt="Profile"/>
          </div>
          <div class="col">
            <div id="hello-text">
              Hello, World!
            </div>
            <div id="hello-subtext">
              Welcome to voget.io, my personal site
            </div>
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row content-row">
          <div class="col">
            <div>
              <h1>About Me</h1>
            </div>
            <div id="about-me-text">
              <ul>
                <li>Full stack software engineer</li>
                <li>Team Lead</li>
                <li>Dad</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row links-row">
          <div class="col">
            <div>
              <a href="https://github.com/matty-v" class="fa fa-github"></a>
              <a href="mailto: matt.voget@gmail.com" class="fa fa-envelope"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
