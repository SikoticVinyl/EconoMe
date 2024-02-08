import { gql } from '@apollo/client';

export const DELETE_BUDGET = gql`
    mutation DeleteBudget($id: ID!) {
        deleteBudget(id: $id) {
            id
            name
        }
    }
`;