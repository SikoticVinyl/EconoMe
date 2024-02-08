import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
mutation CreateTransaction(
    $name: String!,
    $amount: Float!,
    $transactionType: String!,
    $dueDate: String,
    $payDate: String,
    $flexible: Boolean,
    $categoryId: ID!
  ) {
    createTransaction(
      name: $name,
      amount: $amount,
      transactionType: $transactionType,
      dueDate: $dueDate,
      payDate: $payDate,
      flexible: $flexible,
      categoryId: $categoryId
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
        # Include other fields from the Category type as needed
      }
    }
}
`;