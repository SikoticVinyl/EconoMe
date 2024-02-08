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