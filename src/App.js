import './App.css';
import Header from './components/Header';
import MainPage from './Screen/MainPage';
import Login from './Screen/Login';
import Join from './Screen/Join';

import store from './store';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const loginCheck = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
      .then(async (result) => {
        console.log(result);
        await store.dispatch({ type: 'LOGIN', user: result.data.dataValues });
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoginChecked(true);
      });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <>
      {isLoginChecked && (
        <Router className="App">
          <Header />
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
        </Router>
      )}
    </>
  );
}

export default App;
