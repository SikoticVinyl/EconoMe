import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $name: String!
    $amount: Float!
    $transactionType: String!
    $dueDate: String
    $payDate: String
    $flexible: Boolean
    $paid: Boolean
    $categoryId: ID!
  ) {
    createTransaction(
      name: $name
      amount: $amount
      transactionType: $transactionType
      dueDate: $dueDate
      payDate: $payDate
      flexible: $flexible
      paid: $paid
      categoryId: $categoryId
    ) {
      id  # Request only the ID to confirm creation
    }
  }
`;

// Mutation to update a transaction
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $name: String
    $amount: Float
    $dueDate: String
    $payDate: String
    $flexible: Boolean
    $paid: Boolean
  ) {
    updateTransaction(
      id: $id
      name: $name
      amount: $amount
      dueDate: $dueDate
      payDate: $payDate
      flexible: $flexible
      paid: $paid
    ) {
      id
      name
      amount
      transactionType
      dueDate
      payDate
      flexible
      paid
      category {
        id
        name
      }
    }
  }
`;

// Mutation to delete a transaction
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;