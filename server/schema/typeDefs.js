const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Boulder {
        _id: ID!
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
        _id: ID!
        username: String!
        email: String!
        password: String!
        ticks: [Tick]
    }

    type Tick {
        _id: ID!
        route_name: String
        difficulty: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getAllBoulders: [Boulder]
        getSingleBoulder(_id: ID!): Boulder
        getBouldersByGrade(grade: String!): [Boulder]
        getBouldersByArea(area: String!): [Boulder]
        getBouldersBySubArea(sub_area: String!): [Boulder]

        getAllUsers: [User]
        getSingleUser(_id: ID): User
        me: User
        ticks: [Tick]
    }

    type Mutation {
        addBoulder(
            state: String, 
            destination: String, 
            area: String, 
            sub_area: String, 
            boulder_name: String!, 
            grade: String, stars: String, 
            coords: String
        ): Boulder
        updateBoulder(
            _id: ID!, 
            state: String, 
            destination: String, 
            area: String, sub_area: 
            String, boulder_name: 
            String, grade: String, 
            stars: String, 
            coords: String
        ): Boulder
        removeBoulder(_id: ID!): Boulder

        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(username: String!, password: String!): Auth
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User

        addTick(route_name: String!, difficulty: String!): Tick
    }   
`;

module.exports = typeDefs;