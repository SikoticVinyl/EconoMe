const { gql } = require('apollo-server-express');

const userSchema = gql`
  type User {
    id: ID!
    fullName: String!
    username: String!
    email: String!
    budgets: [Budget]
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    createUser(
        fullName: String!
        username: String!
        email: String!
        password: String!
    ): User
    loginUser(
        username: String!
        password: String!
    ): AuthPayload
    updateUser(
        id: ID!
        fullName: String
        username: String
        email: String
        password: String
    ): User
    deleteUser(
        id: ID!
    ): Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = userSchema;