import { gql } from '@apollo/client';

export const QUERY_BOULDERS = gql`
    query getAllBoulders {
        getAllBoulders {
            id
            state
            destination
            area
            sub_area
            boulder_name
            grade
            stars
            coords
        }
    }
`;

export const QUERY_USERS = gql`
    query getAllUsers {
        getAllUsers {
            _id
            username
            email
        }
    }
`;