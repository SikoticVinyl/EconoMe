import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!, $confirm: Boolean!) {
    deleteUser(id: $id, confirm: $confirm)
  }
`;