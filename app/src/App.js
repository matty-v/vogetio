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
      <header className="App-header">
        <h1>voget.io is under construction...</h1>
      </header>
    </div>
  );
}
