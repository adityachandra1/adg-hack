/* User sub Model */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (value.length < 4) {
                    throw new Error('username must be at least 4 characters long');
                }
                if (/[^a-zA-Z0-9]/.test(value)) {
                    throw new Error('username cannot contain special characters');
                }
            },
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        regNo: {
            type: String,
            required: true,
            unique: true
        }, 
        interests: [{
            type: String
        }],
        college: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 8) {
                    throw new Error('password should be atleast 8 characters long');
                }
            },
        }, 
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

