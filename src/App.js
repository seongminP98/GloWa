import './App.css';
import Header from './components/Header';
import MainPage from './Screen/MainPage';
import Login from './Screen/Login';
import Join from './Screen/Join';

import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
