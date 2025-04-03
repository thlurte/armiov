import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import Analysis from './pages/Analysis';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analysis" element={<Analysis />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
