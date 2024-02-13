// Tools for schema creation and merging
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { gql } = require('apollo-server-express');

const baseSchema = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

// Type definitions
const userSchema = require('./userSchema');
const transactionSchema = require('./transactionSchema');
const categorySchema = require('./categorySchema');
const budgetSchema = require('./budgetSchema');

// Merge the type definitions
const typeDefs = mergeTypeDefs([baseSchema, userSchema, transactionSchema, categorySchema, budgetSchema]);

// Corresponding resolvers
const userResolvers = require('../resolvers/userResolvers');
const budgetResolvers = require('../resolvers/budgetResolvers');
const categoryResolvers = require('../resolvers/categoryResolvers');
const transactionResolvers = require('../resolvers/transactionResolvers');

// Merge the resolvers
const resolvers = mergeResolvers([
    userResolvers,
    budgetResolvers,
    categoryResolvers,
    transactionResolvers
]);

// Make the executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
