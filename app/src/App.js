import React from "react";
import './App.css';
const SERVER_URL = process.env.SERVER_URL;

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    };

    this._isMounted = false;
  }

  fetchUsers() {
    fetch(`${SERVER_URL}/api/users`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (this._isMounted) {
        this.setState({ users: data });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) this.fetchUsers();
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
              <div id="" className="row">
                <div id="profile-pic" className="col">
                  <img src="assets/profile-pic.jpeg" alt="Profile"/>
                </div>
                <div className="col">
                  <div id="about-me-content">
                    <div><i className="fa fa-code"></i>Full Stack Engineer</div>
                    <div><i className="fa fa-users"></i>Team Lead</div>
                    <div><i className="fa fa-heart"></i>Dad</div>
                  </div>

                </div>
                <div id="hello-content" className="col">
                  <div id="hello-text">
                    Hello, World!
                  </div>
                  <div id="hello-subtext">
                    You've found Matt Voget's personal site.<br/><br/>
                    <strong>Coming soon:</strong> blog featuring software projects, book reviews, and anything else I find interesting!<br/>
                    Until then, check out my <a href="https://github.com/matty-v">GitHub</a> or <a href="https://www.linkedin.com/in/matthew-voget-47a225a1/">LinkedIn</a>
                  </div>
                </div>
              </div>
              <div className="row content-row">
                <div className="col">
                {this.state.users.map((user) => (
                  <div key={user.id}>
                    <li>{user.id}</li>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

// export default function App() {

//   const [data, setData] = React.useState(null);

//   componentDidMount() {
//     fetch(`${SERVER_URL}/api/users`, {
//       mode: 'cors',
//       headers: {
//         'Access-Control-Allow-Origin':'*'
//       }
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//   };

//   React.useEffect(() => {

//   }, []);

//   return (
//     <>
//       <header className="mdc-top-app-bar">
//         <div className="mdc-top-app-bar__row">
//           <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
//             <span id="app-title" className="mdc-top-app-bar__title"><img id="v-logo" src="assets/v-logo-white.png"></img>voget.io</span>
//           </section>
//           <section id="contact-icons" className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
//             <a href="https://github.com/matty-v" className="fa fa-github"></a>
//             <a href="https://www.linkedin.com/in/matthew-voget-47a225a1" className="fa fa-linkedin"></a>
//             <a href="mailto: matt.voget@gmail.com" className="fa fa-envelope"></a>
//           </section>
//         </div>
//       </header>
//       <main className="mdc-top-app-bar--fixed-adjust">
//         <div className="App">
//           <div className="container">
//             <div id="" className="row">
//               <div id="profile-pic" className="col">
//                 <img src="assets/profile-pic.jpeg" alt="Profile"/>
//               </div>
//               <div className="col">
//                 <div id="about-me-content">
//                   <div><i className="fa fa-code"></i>Full Stack Engineer</div>
//                   <div><i className="fa fa-users"></i>Team Lead</div>
//                   <div><i className="fa fa-heart"></i>Dad</div>
//                 </div>

//               </div>
//               <div id="hello-content" className="col">
//                 <div id="hello-text">
//                   Hello, World!
//                 </div>
//                 <div id="hello-subtext">
//                   You've found Matt Voget's personal site.<br/><br/>
//                   <strong>Coming soon:</strong> blog featuring software projects, book reviews, and anything else I find interesting!<br/>
//                   Until then, check out my <a href="https://github.com/matty-v">GitHub</a> or <a href="https://www.linkedin.com/in/matthew-voget-47a225a1/">LinkedIn</a>
//                 </div>
//               </div>
//             </div>
//             <div className="row content-row">
//               <div className="col">
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
