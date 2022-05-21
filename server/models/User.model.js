const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username address is required!',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Email address is required!',
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: 'Password is required',
            trim: true
        }
    },
);

const User = model('user', userSchema);

module.exports = User;