import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
		console.log(formData.email + formData.password)
		try {
			const response = await axios.post(
				'https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Accounts/login',{
					email: formData.email,
          password: formData.password
				}
			);
	
			if (response.status === 200) {
				navigate('/register-verify');
			} else {
				alert('Sign in failed: ' + response.data.message);
			}
		} catch (error) {
			if (error.response) {
				// Serverdan xato xabar
				alert('Error: ' + error.response.data.message || error.response.statusText);
			} else if (error.request) {
				// So‘rov yuborilgan, lekin javob olinmagan
				alert('No response received: ' + error.message);
			} else {
				// So‘rovni sozlashdagi xatolik
				alert('Error in setup: ' + error.message);
			}
		}
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-8">
        <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
          <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign In</h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">Sign up here</a>
          </p>

          <form className="my-4 text-sm" onSubmit={onSubmit}>
            <div className="flex flex-col my-4">
              <label htmlFor="email" className="text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col mt-4 my-8">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <div className="relative flex items-center mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-[10px] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-between">
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center space-x-2">
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
