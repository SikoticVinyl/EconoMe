const { gql } = require('apollo-server-express');

const transactionSchema = gql`
	type Transaction {
		id: ID!
		name: String!
		amount: Float!
		transactionType: String!
		dueDate: String
		payDate: String
		flexible: Boolean
		paid: Boolean
		category: Category!
	}

	type CategoryTotal {
		categoryId: ID!
		name: String!
		totalAmount: Float!
	}

	extend type Query {
		transaction(id: ID!): Transaction
		transactions: [Transaction]
		totalIncome: Float!
		totalExpenses: Float!
		totalSavings: Float!
		totalFlexibleExpenses: Float!
		totalIncomeByCategory: [CategoryTotal]!
		totalExpensesByCategory: [CategoryTotal]!
	}

	extend type Mutation {
		createTransaction(
			name: String!
			amount: Float!
			transactionType: String!
			dueDate: String
			payDate: String
			flexible: Boolean
			paid: Boolean
			categoryId: ID!
		): Transaction
		updateTransaction(
			id: ID!
			name: String
			amount: Float
			dueDate: String
			payDate: String
			flexible: Boolean
			paid: Boolean
		): Transaction
		moveTransaction(transactionId: ID!, newCategoryId: ID!): Transaction
		deleteTransaction(id: ID!): Transaction
	}
`;

module.exports = transactionSchema;