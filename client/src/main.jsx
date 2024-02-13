import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import './index.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

// Render the App component wrapped with ApolloProvider using createRoot
const container = document.getElementById('root'); // Get the root container
const root = createRoot(container); // Use createRoot for React 18
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
