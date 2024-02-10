import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../client-graphql/queries/login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          username,
          password,
        },
      });

      console.log('Data sent to server:', { username, password });
      
      if (data && data.loginUser && data.loginUser.token) {
        // You have a valid token here, you can store it in localStorage or a cookie
        const token = data.loginUser.token;

        // Log the token
        console.log('Token received from server:', token);

        // You can now redirect the user to a protected route or perform other actions
        //Token in localStorage:
        localStorage.setItem('token', token);

        // Redirect the user to a protected page:
        // history.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-500">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
