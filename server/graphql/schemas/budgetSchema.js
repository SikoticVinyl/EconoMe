const { gql } = require('apollo-server-express');

const budgetSchema = gql`
    type Budget {
        id: ID!
        user: User!
        name: String!
        date: String!
        categories: [Category]
    }

    extend type Query {
        budget(id: ID!): Budget
        budgets: [Budget]
    }

    extend type Mutation {
        createBudget(
            name: String!
            date: String!
        ): Budget
        updateBudget(
            id:ID!
            name: String
            date: String
        ): Budget
        deleteBudget(id:ID!): Budget
    }
    `;

module.exports = budgetSchema;