import { gql } from '@apollo/client';

export const GET_BUDGETS = gql`
    query GetBudgets {
        budgets {
            id
            name
            categories {
                id
                name
            }
        }
    }
`;

export const GET_BUDGET_BY_ID = gql`
    query GetBudgetById($id: ID!) {
        budget(id: $id) {
            id
            name
            categories {
                id
                name
                flexB
            }
        }
    }
`;