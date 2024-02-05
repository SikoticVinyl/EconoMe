const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Import your GraphQL type definitions and resolvers
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(express.json());

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

  // Create an instance of ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Add context if you need to share data or authentication state between resolvers
    context: ({ req }) => ({ req }),
  });

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Specify the port
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL path is ${server.graphqlPath}`);
  });
}

startServer();