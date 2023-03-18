const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    resourceType: {
        type: String,
        required: true
    },
    requestedDate: {
        type: Date,
        default: Date.now
    },
    requestContent: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
