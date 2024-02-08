import { gql } from '@apollo/client';

export const CREATE_BUDGET = gql`
    mutation CreateBudget($name: String!) {
        createBudget(name: $name) {
            id
            name
            categories {
                id
                name
            }
        }
    }
`;