import React from 'react';
import logo from './logo.svg';
import './App.css';

const { REACT_APP_SERVER_URL } = process.env;

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${REACT_APP_SERVER_URL}/api/users`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : JSON.stringify(data, null, 2)}</p>
      </header>
    </div>
  );
}

export default App;
