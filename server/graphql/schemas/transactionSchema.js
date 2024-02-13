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
    totalIncome(userId: ID!): Float
    totalExpenses(userId: ID!): Float
    totalSavings(userId: ID!): Float
    totalFlexibleExpenses(userId: ID!): Float
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
      dueDate: String
      payDate: String
      flexible: Boolean
      paid: Boolean
    ): Transaction
    moveTransaction(transactionId: ID!, newCategoryId: ID!): Transaction
    deleteTransaction(id: ID!): Transaction
    deleteAllUserTransactions: Boolean!
  }
`;

module.exports = transactionSchema;