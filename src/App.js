import './App.css';
import Header from './Header';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router className="App">
      <Header />
    </Router>
  );
}

export default App;
