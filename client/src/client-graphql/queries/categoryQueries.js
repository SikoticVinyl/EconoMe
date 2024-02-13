import { gql } from '@apollo/client';

// Query to fetch a single category by its ID
export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    category(id: $id) {
      id
      name
      flexB
      budget
    }
  }
`;

// Query to fetch all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      flexB
      budget
    }
  }
`;
