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