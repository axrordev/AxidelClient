import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterVerifyPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/api/Accounts/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, code: code, password: password }),
      });

      if (!response.ok) {
        alert('Error: ' + response.statusText);
        return;
      }

      const data = await response.json();

      if (data.statusCode === 200) {
        // Store the token in local storage or cookies if needed
        localStorage.setItem('token', data.data.token);

        // Navigate to the main page after successful verification
        navigate('https://axidel.netlify.app/'); // Adjust this path as necessary
      } else {
        alert('Verification failed: ' + data.message);
      }
    } catch (error) {
      alert('Failed to verify: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="w-full py-8">
        <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mx-auto px-16 py-4 rounded-lg shadow-2xl">
          <h2 className="py-4 text-center text-2xl font-bold tracking-wide text-gray-800">Verify Your Account</h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Please enter the verification code sent to your email.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="code" className="text-gray-700">Verification Code</label>
              <input
                type="text"
                name="code"
                id="code"
                className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter the verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-[10px] mt-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterVerifyPage;
