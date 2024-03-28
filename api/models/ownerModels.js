const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    userId: { type: String, },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']

    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']

    },
    email: {
        type: String,
        required: [true, 'email is required']

    }
    ,
    website: {
        type: String,

    },
    address: {
        type: String,
        required: [true, 'Address is required']

    },
    description: {
        type: String,
        required: [true, 'Description  is required']

    },
    features: {
        type: String,

    },
    feesAvg: {
        type: Number,
        required: [true, 'Price is required']

    },
    timings: {
        type: Object,
        required: [true, 'Open time is required']

    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true })

const ownerModel = mongoose.model('owners', ownerSchema)

module.exports = ownerModel