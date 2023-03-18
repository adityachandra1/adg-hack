const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true, 
            enum: ['blog', 'news', 'event', 'achievement', 'hiring']
        },
        author: {
            type: String,
            required: true
        },
        tags: [
            {
                type: String
            }
        ],
        likes: {
            type: Number,
            default: 0
        },
        timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);


