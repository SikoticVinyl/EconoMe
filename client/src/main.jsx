import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Import setContext for setting headers
import App from './App.jsx';
import './index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create a middleware to set the token in the request headers
const authLink = setContext((_, { headers }) => {
  // Get the token from secure storage (e.g., localStorage)
  const token = localStorage.getItem('token');

  // Return the headers with the token attached
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token to the Authorization header if present
    }
  }
});

// Set up Apollo Client with the HTTP link and auth middleware
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Attach the auth middleware
  cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
