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
            
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
            
            console.log('Context User: ', userData);

            if (context.user) {
                return userData;
            };
            throw new AuthenticationError('You need to be logged in.');
        },
        
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create( args );

            const token = signToken(user);

            console.log('AddUser Token: ', token);
            console.log('AddUser: ', user);

            return { token, user };
        },
        signInUser: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) throw new AuthenticationError('No user found. Check for accuracy and try again.');

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) throw new AuthenticationError('Incorrect password. Check for accuracy and try again.');
            
            const token = signToken(user);
            console.log('LoginUser Token: ', token);
            console.log('LoginUser User: ', user);
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
            console.log('Context User: ',context.user);
            if(context.user) {
                const tick = await User.findByIdAndUpdate(
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
        deleteTick: async (parent, { _id }, context) => {
            console.log('DeleteTick Args: ', _id);
            console.log('Context User deleteTick:', context.user._id);
            if(context.user) {
                const tick = await User.findByIdAndUpdate(
                    {
                        _id: context.user._id,
                    },
                    { 
                        $pull: { ticks: { _id: _id } }
                    },
                    { new: true },
                );
                console.log('Tick: ',tick);
                return tick;
            };
            throw new AuthenticationError('Cannot delete Tick!');
        },
        updateTick: async (parent, { _id, route_name, difficulty }, context) => {
            if (context.user) {
                const tick = await User.findOneAndUpdate(
                    {
                        _id: context.user._id,
                        "ticks._id": _id
                    },
                    {
                        $set: {
                            "ticks.$.route_name": route_name,
                            "ticks.$.difficulty": difficulty,
                        }
                    },
                    { new: true },
                );
                console.log('Tick Update: ', tick);
                return tick;
            };
            throw new AuthenticationError('Cannot update Tick!');
        },
    },
};

module.exports = resolvers;