import { gql } from '@apollo/client';

// Mutation to create a category
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $flexB: Boolean!, $budgetId: ID!) {
    createCategory(name: $name, flexB: $flexB, budgetId: $budgetId) {
      id
      name
      flexB
      budget
    }
  }
`;

// Mutation to update a category
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String, $flexB: Boolean) {
    updateCategory(id: $id, name: $name, flexB: $flexB) {
      id
      name
      flexB
      budget
    }
  }
`;

// Mutation to delete a category
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      flexB
      budget
    }
  }
`;
