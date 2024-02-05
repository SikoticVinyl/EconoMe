const { gql } = require('apollo-server-express');

const transactionSchema = gql`
  type Transaction {
    id: ID!
    name: String!
    amount: Float!
    transactionType: String!
    dueDate: String
    payDate: String
    flexible: Boolean
    paid: Boolean
    category: Category!
  }

  extend type Query {
    transaction(id: ID!): Transaction
    transactions: [Transaction]
  }

  extend type Mutation {
    createTransaction(
      name: String!
      amount: Float!
      transactionType: String!
      dueDate: String
      payDate: String
      flexible: Boolean!
      paid: Boolean!
      categoryId: ID!
    ): Transaction
    updateTransaction(
      id: ID!
      name: String
      amount: Float
      transactionType: String
      dueDate: String
      payDate: String
      flexible: Boolean
      paid: Boolean
    ): Transaction
    deleteTransaction(id: ID!): Transaction
  }
`;

module.exports = transactionSchema;