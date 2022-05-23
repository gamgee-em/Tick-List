const { Boulder, User } = require('../models');

const resolvers = {
    Query: {
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
        getAllUsers: async () => {
            const users = await User.find({});
            return users;
        },
        getSingleUser: async (parent, { _id }) => {
            const user = await User.findById(_id);
            return user;
        }
    },
    Mutation: {
        addBoulder: async (parent, args) => {
            const boulder = await Boulder.create(args);
            return boulder;
        },
        updateBoulder: async (parent, 
            { _id, state, destination, area, sub_area, boulder_name, grade, stars, coords }) => {
            
            const boulder= await Boulder.findByIdAndUpdate( _id, 
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
        removeBoulder: async(parent, { _id }) => {
            const boulder = await Boulder.findByIdAndRemove(_id);
            return boulder;
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            return user;
        },
        updateUser: async(parent, { _id, username, email, password }) => {
            const user = await User.findByIdAndUpdate(_id, 
                { _id, username, email, password },
                { new: true }    
            );
            return user;
        }
    },
};

module.exports = resolvers;