import { useMutation, gql } from "@apollo/client";
import { useState } from 'react';

const SIGNUP_USER = gql
  `mutation Signup($fullName: String!, $username: String!, $email: String!, $password: String!) {
    createUser(fullName: $fullName, username: $username, email: $email, password: $password) {
      token
      user {
        id
        fullName
        username
        email
      }
    }
  }`
  ;

function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser] = useMutation(SIGNUP_USER);

  const handleSignup = async (event) => {
    event.preventDefault();
    // Get user input from form
    // Call signupUser mutation with user input
    try {
      const { data } = await signupUser({
        variables: { fullName, username, email, password },
      });
      // Store JWT token from data.token (localStorage or Context)
      localStorage.setItem('token', data.createUser.token);
      console.log("Handle sign up log: "`${fullName, username, email, password}`)
      // Redirect or perform desired actions after successful signup
    } catch (error) {
      // Handle signup error
      console.error(err);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up
      </h2>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
        </div>
      </div>

      <div>
        <button type="submit" onClick={handleSignup} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
  );
}

export default Signup;