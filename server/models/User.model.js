const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
            trim: true,
        }
    },
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 11;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;