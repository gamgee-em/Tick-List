import { gql } from '@apollo/client';

export const ADD_BOULDER = gql`
    mutation addBoulder($state: String, $destination: String, $area: String, $sub_area: String, $boulder_name: String!, $grade: String, $stars: String, $coords: String) {
        addBoulder(state: $state, destination: $destination, area: $area, sub_area: $sub_area, boulder_name: $boulder_name, grade: $grade, stars: $stars, coords: $coords) {
            _id
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

export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_TICK = gql`
    mutation addTick($route_name: String!, $difficulty: String!) {
        addTick(route_name: $route_name, difficulty: $difficulty) {
            _id
            route_name
            difficulty
        }
    }
`;