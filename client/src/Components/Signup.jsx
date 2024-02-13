import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../client-graphql/mutations/createUser';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({
        variables: formData,
      });

      if (data && data.createUser && data.createUser.token) {
        // User creation was successful.
        // Handle success here, redirecting to a login page.
        console.log('User created successfully:', data.createUser.user);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  // Render the signup form
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/Signupbg.jpg')] bg-cover bg-top py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-75 p-10 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-rubik-doodle">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input id="fullName" name="fullName" type="text" required placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required placeholder="Username" value={formData.username} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" required placeholder="Email address" value={formData.email} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded cursor-pointer active:scale-90 transform transition duration-300 ease-in-out hover:scale-105">
  Create Account
</button>
          {error && <p className="mt-2 text-center text-sm text-red-600">Error :( Please try again</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
