import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($name: String!, $flexB: Boolean!, $budgetId: ID!) {
        createCategory(name: $name, flexB: $flexB, budgetId: $budgetId) {
            id
            name
            flexB
        }
    }
`;