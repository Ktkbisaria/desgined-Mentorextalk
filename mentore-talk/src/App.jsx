import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Welcome to MentoreTalk</h1>} />
      </Routes>
    </Router>
  );
};

export default App;