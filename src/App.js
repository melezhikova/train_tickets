import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Tickets from './components/Tickets';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tickets" element={<Tickets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
