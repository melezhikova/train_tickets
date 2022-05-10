import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Tickets from './components/Tickets';
import Seats from './components/Seats';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tickets" element={<Tickets />} />
          <Route exact path="/seats" element={<Seats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
