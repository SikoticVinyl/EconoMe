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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      





    </div>
  );
}

export default Login;