import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com',
  cache: new InMemoryCache()
});

const root = document.getElementById('root');
if (root !== null) {
  const app = (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );

  ReactDOM.createRoot(root).render(app);
}
