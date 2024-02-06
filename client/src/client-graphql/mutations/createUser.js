import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $fullName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      fullName: $fullName,
      username: $username,
      email: $email,
      password: $password
    ) {
        id
        fullName
        username
        email
      }
    }
`;
