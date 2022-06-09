const { AuthenticationError } = require('apollo-server-express');
const { Boulder, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            const users = await User.find({}).populate('ticks');
            return users;
        },
        getSingleUser: async (parent, { _id }) => {
            const user = await User.findById(_id);
            return user;
        },
        getAllBoulders: async () => {
            const boulders = await Boulder.find({});
            return boulders;
        },
        getSingleBoulder: async (parent, { _id }) => {
            const boulder = await Boulder.findById(_id);
            return boulder;
        },
        getBouldersByGrade: async (parent, { grade }) => {
            const boulders = await Boulder.find({ grade });
            return boulders;
        },
        getBouldersByArea: async (parent, { area }) => {
            const boulders = await Boulder.find({ area });
            return boulders;
        },
        getBouldersBySubArea: async (parent, { sub_area }) => {
            const boulders = await Boulder.find({ sub_area });
            return boulders;
        },
        me: async (parent, args, context ) => {
            console.log('Context User: ', context.user)
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
            if (context.user) {
                return userData;
            };
            throw new AuthenticationError('You need to be logged in.');
        },
        
    },
    Mutation: {
        addUser: async (parent, args/* { username, email, password } */) => {
            const user = await User.create(args/* { username, email, password } */);

            const token = signToken(user);

            return { token, user };
        },
        loginUser: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) throw new AuthenticationError('No user found. Check for accuracy and try again.');

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) throw new AuthenticationError('Incorrect password. Check for accuracy and try again.');
            console.log(user);
            const token = signToken(user);
            
            return { token, user };
        },
        updateUser: async (parent, { _id, username, email, password }) => {
            const user = await User.findByIdAndUpdate(_id, 
                { _id, username, email, password },
                { new: true }    
            );
            return user;
        },
        deleteUser: async (parent, { _id }) => {
            const user = await User.findByIdAndRemove(_id);
            return user;
        },
        addBoulder: async (parent, args) => {
            const boulder = await Boulder.create(args);
            return boulder;
        },
        updateBoulder: async (parent, { _id, state, destination, area, sub_area, boulder_name, grade, stars, coords }) => {       
            const boulder = await Boulder.findByIdAndUpdate( _id, 
                { 
                    _id,
                    state, 
                    destination, 
                    area, 
                    sub_area, 
                    boulder_name, 
                    grade,
                    stars,
                    coords
                }, 
                { new: true }
            );
            return boulder;
        },
        removeBoulder: async (parent, { _id }) => {
            const boulder = await Boulder.findByIdAndRemove(_id);
            return boulder;
        },
        addTick: async (parent, { route_name, difficulty }, context) => {
            if(context.user) {
                const tick = await User.findOneAndUpdate(
                    {
                        _id: context.user._id,
                    }, 
                    { $addToSet: { ticks: [{ route_name, difficulty }] } },
                    { new: true },
                );
                console.log('Tick: ', tick);
                return tick;
            };
            throw new AuthenticationError('Please login to add tick!');
        },
    },
};

module.exports = resolvers;