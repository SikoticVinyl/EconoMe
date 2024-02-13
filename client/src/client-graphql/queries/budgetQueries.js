import { gql } from '@apollo/client';

// Query to fetch a single budget by its ID
export const GET_BUDGET_BY_ID = gql`
  query GetBudgetById($id: ID!) {
    budget(id: $id) {
      id
      name
      user
    }
  }
`;

// Query to fetch all budgets
export const GET_BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      name
      user
    }
  }
`;
