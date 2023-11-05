import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProtectedPage from './components/ProtectedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        <Route path="/protected" element={<ProtectedPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
