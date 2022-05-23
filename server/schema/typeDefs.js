const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Boulder {
        id: ID!
        state: String
        destination: String
        area: String
        sub_area: String
        boulder_name: String
        grade: String
        stars: String
        coords: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getAllBoulders: [Boulder]
        getSingleBoulder(_id: ID!): Boulder
        getBouldersByGrade(grade: String!): [Boulder]
        getBouldersByArea(area: String!): [Boulder]
        getBouldersBySubArea(sub_area: String!): [Boulder]

        getAllUsers: [User]
        getSingleUser(_id: ID, username: String): User
    }

    type Mutation {
        addBoulder(state: String, destination: String, area: String, sub_area: String, boulder_name: String!, grade: String, stars: String, coords: String): Boulder
        updateBoulder(_id: ID!, state: String, destination: String, area: String, sub_area: String, boulder_name: String, grade: String, stars: String, coords: String): Boulder
        removeBoulder(_id: ID!): Boulder

        addUser(username: String!, email: String!, password: String!): User
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User
    }   
`;

module.exports = typeDefs;

