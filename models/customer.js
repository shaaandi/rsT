const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : String,
    address : String,
    googleId : String,
    initialized : {
        type : Boolean,
        default : false
    },
    badge : {
        type : String,
        default : 'NOT_INITIALIZED'
    },
    wishList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products',
            default : []
        }
    ],
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products',
            default  :[]
        }
    ],
    cartQuantity : {
        type :Map,
        of : Number,
        default : {}
    },
    customerOrders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customerOrders'
    }]
    
})

mongoose.model('customers', customerSchema);