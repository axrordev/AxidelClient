import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // Step 1 - email verification, Step 2 - code verification
  const [error, setError] = useState('');

  const sendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Accounts/send-code?email=${email}`);
      setStep(2);
    } catch (err) {
      setError('Email not found or failed to send code.');
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Accounts/verify?email=${email}&code=${code}`);
      window.location.href = `/reset-password?email=${email}`; // Navigate to reset password page
    } catch (err) {
      setError('Invalid code.');
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-8">
        <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
          <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Forgot Password</h2>
          
          {step === 1 ? (
            <form className="my-4 text-sm" onSubmit={sendCode}>
              <div className="flex flex-col my-4">
                <label htmlFor="email" className="text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white py-[10px] rounded hover:bg-blue-700">
                Send Code
              </button>
            </form>
          ) : (
            <form className="my-4 text-sm" onSubmit={verifyCode}>
              <div className="flex flex-col my-4">
                <label htmlFor="code" className="text-gray-700">Enter Verification Code</label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter the code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white py-[10px] rounded hover:bg-blue-700">
                Verify Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
