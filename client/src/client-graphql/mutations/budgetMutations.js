import { gql } from '@apollo/client';

// Mutation to create a budget
export const CREATE_BUDGET = gql`
mutation CreateBudget($name: String!) {
  createBudget(name: $name) {
    id
    name
  }
}
`;


// Mutation to update a budget
export const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID!, $name: String!) {
    updateBudget(id: $id, name: $name) {
      id
      name
      user
    }
  }
`;

// Mutation to delete a budget
export const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id) {
      id
      name
      user
    }
  }
`;
