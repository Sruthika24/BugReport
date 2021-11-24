import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyRoute1 from './routes/DummyRoute1';
import DummyRoute2 from './routes/DummyRoute2';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<DummyRoute1 />} />
          <Route path="/dummyRoute2" element={<DummyRoute2 />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
