//Tools for schema creation and merging
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Type definitions
const userSchema = require('./userSchema');
const transactionSchema = require('./transactionSchema');
const categorySchema = require('./categorySchema');
const budgetSchema = require('./budgetSchema');

// Merge the type definitions
const typeDefs = mergeTypeDefs([userSchema, transactionSchema, categorySchema, budgetSchema]);

//Corresponding resolvers
const userResolvers = require('../resolvers/userResolvers');

const resolvers = mergeResolvers([
    userResolvers ]);

// Make the executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;