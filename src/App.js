import './App.css';
import Header from './components/Header';
import MainPage from './Screen/MainPage';
import Login from './Screen/Login';
import Detail from './Screen/Detail';
import Join from './Screen/Join';
import Favorites from './Screen/Favorites';
import Schedule from './Screen/Schedule';
import FriendsList from './components/FriendsList';

import store from './store';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const loginCheck = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
      .then(async (result) => {
        await store.dispatch({ type: 'LOGIN', user: result.data.data });
        setIsLoginChecked(true);
      })
      .catch((error) => {
        setIsLoginChecked(true);
      });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const FriendsDiv = styled.div`
    margin-left: 80px;
    position: relative;
    top: 50px;
  `;
  const MainMainDiv = styled.div`
    min-width: 1400px;
    display: flex;
    justify-content: center;
  `;
  const MainDiv = styled.div`
    display: flex;
    justify-content: space-around;
    width: 1400px;
  `;

  return (
    <>
      {isLoginChecked && (
        <Router className="App">
          <Header />
          <Route exact path="/">
            <MainMainDiv>
              <MainDiv>
                <MainPage />
                <FriendsDiv>
                  <FriendsList />
                </FriendsDiv>
              </MainDiv>
            </MainMainDiv>
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/schedule/detail/:id">
            <MainMainDiv>
              <MainDiv>
                <Detail />
                <FriendsDiv>
                  <FriendsList />
                </FriendsDiv>
              </MainDiv>
            </MainMainDiv>
          </Route>
        </Router>
      )}
    </>
  );
}

export default App;
