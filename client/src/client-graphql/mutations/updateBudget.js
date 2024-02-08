import { gql } from '@apollo/client';

export const UPDATE_BUDGET = gql`
    mutation UpdateBudget($id: ID!, $name: String!) {
        updateBudget(id: $id, name: $name) {
            id
            name
            categories {
                id
                name
            }
        }
    }
`;