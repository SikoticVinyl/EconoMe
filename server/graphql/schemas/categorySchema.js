const { gql } = require('apollo-server-express');

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    flexB: Boolean!
    transactions: [Transaction]
    filter: String!
    budget: Budget!
  }

  extend type Query {
    category(id: ID!): Category
    categories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!, flexB: Boolean!, budgetId: ID!): Category
  }
`;

module.exports = categorySchema;