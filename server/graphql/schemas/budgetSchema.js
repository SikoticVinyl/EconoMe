const { gql } = require('apollo-server-express');

const budgetSchema = gql`
    type Budget {
        id: ID!
        user: User!
        name: String!
        categories: [Category]
    }

    extend type Query {
        budget(id: ID!): Budget
        budgets: [Budget]
    }

    extend type Mutation {
        createBudget(name: String!): Budget
        updateBudget(
            id: ID!
            name: String
        ): Budget
        deleteBudget(id: ID!): Budget
    }
`;

module.exports = budgetSchema;
