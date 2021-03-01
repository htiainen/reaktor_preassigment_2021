import { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api/")
      .then(res => {console.log(res); return res.json()}).then(response => {
        setData(response.results);
        console.log(response)
        setIsLoading(false);
      },
      e => {
        console.error(e)
      });
  }, []);
  return (
    <>
      {!isLoading && <p>{data}</p>}

    </>
  )
}

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </>
  );
}

export default App;
