import { gql } from '@apollo/client';

export const QUERY_BOULDERS = gql`
  query getAllBoulders {
    getAllBoulders {
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

export const QUERY_USERS = gql`
  query getAllUsers {
    getAllUsers {
      _id
      token
      username
      email
      ticks {
        route_name
        difficulty
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getSingleUser($_id: ID!) {
    getSingleUser(_id: $_id) {
      _id
      token
      username
      email
      ticks {
        route_name
        difficulty
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      ticks {
        _id
        route_name
        difficulty
      }
    }
  }
`;
