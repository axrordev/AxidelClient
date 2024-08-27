import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage'; 
import RegisterVerifyPage from './Pages/RegisterVerifyPage';
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignInPage />} />
					<Route path="/register-verify" element={<RegisterVerifyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
  );
};
export default App;