import { gql } from '@apollo/client';

// Mutation to create a user
export const CREATE_USER = gql`
mutation CreateUser($fullName: String!, $username: String!, $email: String!, $password: String!) {
  createUser(fullName: $fullName, username: $username, email: $email, password: $password) {
    token
    user {
      id
      fullName
      username
      email
    }
  }
}
`;

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        fullName
        username
        email
      }
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $fullName: String, $username: String, $email: String, $password: String) {
    updateUser(id: $id, fullName: $fullName, username: $username, email: $email, password: $password) {
      id
      fullName
      username
      email
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!, $confirm: Boolean!) {
    deleteUser(id: $id, confirm: $confirm)
  }
`;