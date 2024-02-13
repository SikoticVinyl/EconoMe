import { gql } from '@apollo/client';

// Query to fetch all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      fullName
      username
      email
    }
  }
`;
