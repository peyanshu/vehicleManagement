const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { 
        type: String, 
        required: true,
    },
    ownerName: { 
        type: String, 
        required: true,
    },
    vehicleType: { 
        type: String, 
        required: true,
    },
    insuranceExpiry: { 
        type: Date,
        required: true,
    },
    fitnessExpiry: { 
        type: Date,
        required: true,
    },
    permitExpiry: { 
        type: Date,
        required: true,
    },
    pollutionExpiry: { 
        type: Date,
        required: true,
    },
    taxExpiry: { 
        type: Date,
        required: true,
    },
    documentStatus: {
        type: String,
        enum: ['Active', 'Expired', 'Warning'],
        default: 'Active',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    oldVehicle: {
        type: Boolean,
        default: false,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
