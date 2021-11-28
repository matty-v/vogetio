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
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <p>{!data ? "Loading..." : JSON.stringify(data, null, 2)}</p>
      </header>
    </div>
  );
}
