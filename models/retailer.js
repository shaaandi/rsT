const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
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
        },// later changed to individual Address schema
        customers : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'customers'
        },
        inventory : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products'
        }],
        retailerOrders : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'retailerOrders'
        }]
    
    // orders and other detailes will be added later  
})

mongoose.model('retailers', retailerSchema);