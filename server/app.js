require('dotenv').config({ path: '../.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const schema = require('./graphql/schemas');

async function startServer() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(express.json());

  console.log("app.js connect: ", process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  const server = new ApolloServer({
    schema, 
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL path is ${server.graphqlPath}`);
  });
}

startServer();