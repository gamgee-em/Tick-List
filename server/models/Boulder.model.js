const { Schema, model } = require('mongoose');

const boulderSchema = new Schema(
    {
        state: {
            type: String,
            required: false
        },
        destination: {
            type: String,
            required: false
        },
        area: {
            type: String,
            required: false
        },
        sub_area: {
            type: String,
            require: false
        },
        boulder_name: {
            type: String,
            required: true
        },
        grade: {
            type: String,
            required: false,
            default: 0
        },
        stars: {
            type: String,
            required: false,
            default: 0
        },
        coords: {
            type: String,
            required: false
        }
    }
);

const Boulder = model('boulder', boulderSchema);

module.exports = Boulder;