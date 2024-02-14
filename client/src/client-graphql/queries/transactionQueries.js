import { gql } from '@apollo/client';

// Query to fetch all transactions
export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
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

// Query to fetch a single transaction by its ID
export const GET_TRANSACTION_BY_ID = gql`
  query GetTransactionById($id: ID!) {
    transaction(id: $id) {
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

// Query to fetch total income
export const GET_TOTAL_INCOME = gql`
  query GetTotalIncome {
    totalIncome
  }
`;

// Query to fetch total expenses
export const GET_TOTAL_EXPENSES = gql`
  query GetTotalExpenses {
    totalExpenses
  }
`;

// Query to fetch total flexible expenses
export const GET_TOTAL_FLEXIBLE_EXPENSES = gql`
  query GetTotalFlexibleExpenses {
    totalFlexibleExpenses
  }
`;

// Query to fetch total expenses by category
export const GET_TOTAL_EXPENSES_BY_CATEGORY = gql`
  query GetTotalExpensesByCategory {
    totalExpensesByCategory {
      categoryId
      name
      totalAmount
    }
  }
`;

// Query to fetch total income by category
export const GET_TOTAL_INCOME_BY_CATEGORY = gql`
  query GetTotalIncomeByCategory {
    totalIncomeByCategory {
      categoryId
      name
      totalAmount
    }
  }
`;
