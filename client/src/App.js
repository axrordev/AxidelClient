import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage'; 
import RegisterVerifyPage from './Pages/RegisterVerifyPage';
import HomePage from './Components/HomePage';
import MyCollection from './Components/MyCollectionPage';
import ServicesPage from './Components/ServicesPage';
import ItemPage from './Components/ItemPage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes under Dashboard */}
          <Route path="/" element={<HomePage />} />
          <Route path="mycollection" element={<MyCollection />} />
          <Route path="services" element={<ServicesPage />} />
					<Route path="items/:collectionId" element={<ItemPage />} />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register-verify" element={<RegisterVerifyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
