import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import Analysis from './pages/Analysis';
import PatientForm from './pages/PatientForm';
import PatientList from './pages/PatientList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/new" element={<PatientForm />} />
          <Route path="/analysis/upload/:patientId" element={<Analysis />} />
          <Route path="/analysis/view/:patientId" element={<Analysis />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
