import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!, 
        $fullName: String, 
        $username: String, 
        $email: String, 
        $password: String
    ) {
        updateUser(
            id: $id,
            fullName: $fullName,
            username: $username, 
            email: $email, 
            password: $password
        ) {
            token
            id
            fullName
            username
            email
        }
    }
`;
