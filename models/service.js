const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name : String,
    googleId : String,
    address : String,
    initialized : {
        type : Boolean,
        default : false
    },
    badge : {
        type : String,
        default : 'NOT_INITIALIZED'
    },
    retailerOrders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'retailerOrders'
    }],
    customerOrders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customerOrders'
    }],
    serviceOrders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'serviceOrders'
    }]
})

mongoose.model('services',serviceSchema)