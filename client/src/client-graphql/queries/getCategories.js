import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
    queryGetCategory($id: ID!) {
        category(id: $id) {
            id
            name
            flexB
            budget {
                id
                name
            }
        }
    }
`;

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            flexB
            budget {
                id
                name
            }
        }
    }
`