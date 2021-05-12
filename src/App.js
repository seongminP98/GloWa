import './App.css';
import Header from './Header';
import MainPage from './MainPage';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router className="App">
      <Header />
      <MainPage />
    </Router>
  );
}

export default App;
