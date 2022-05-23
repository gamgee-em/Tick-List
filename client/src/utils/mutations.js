import { gql } from '@apollo/client';

export const ADD_BOULDER = gql`
    mutation addBoulder($state: String, $destination: String, $area: String, $sub_area: String, $boulder_name: String!, $grade: String, $stars: String, $coords: String) {
        addBoulder(state: $state, destination: $destination, area: $area, sub_area: $sub_area, boulder_name: $boulder_name, grade: $grade, stars: $stars, coords: $coords) {
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

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            id
            username
            email
            password
        }
    }
`;