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
        <div id="" class="row">
          <div id="profile-pic" class="col">
            <img src="assets/profile-pic.jpeg" alt="Profile"/>
          </div>
          <div class="col">
            <div id="hello-text">
              Hello, World!
            </div>
            <div id="hello-subtext">
              You've found Matt Voget's personal site
            </div>
            <div id="contact-icons">
              <a href="https://github.com/matty-v" class="fa fa-github"></a>
              <a href="https://www.linkedin.com/in/matthew-voget-47a225a1" class="fa fa-linkedin"></a>
              <a href="mailto: matt.voget@gmail.com" class="fa fa-envelope"></a>
            </div>
          </div>
          <div class="col">

          </div>
        </div>
        <div class="row content-row">
          <div class="col">
            <div id="about-me-content">
              <div><i class="fa fa-code"></i>Full Stack Engineer</div>
              <div><i class="fa fa-users"></i>Team Lead</div>
              <div><i class="fa fa-heart"></i>Dad</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
