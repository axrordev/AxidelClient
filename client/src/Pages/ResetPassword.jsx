import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email'); // Get email from URL

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Accounts/reset-password`, null, {
        params: {
          email,
          newPassword
        }
      });
      alert('Password reset successful');
      window.location.href = '/signin'; // Redirect to login page
    } catch (err) {
      setError('Failed to reset password.');
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-8">
        <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
          <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Reset Password</h2>
          
          <form className="my-4 text-sm" onSubmit={resetPassword}>
            <div className="flex flex-col my-4">
              <label htmlFor="newPassword" className="text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-[10px] rounded hover:bg-blue-700">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
