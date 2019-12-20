const mongoose = require('mongoose');

const customerOrderSchema = new mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    retailers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'retailers',
        default : []
    }],
    middleServices : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'services'
    }],
    deliveringService : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'services'
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'products'
    }],
    productsQuantity : {
        type : Map,
        of : Number
    },
    productsStatus : {
        type : Map,
        of : Boolean
    },
    pAmount : {
        type : Number,
        default : 0
    },
    dAmount : {
        type : Number,
        default : 0
    },
    tAmount : {
        type : Number,
        default : 0
    },
    shippingAddress : String,
    status : {
        type : String,
        default : 'Processed',
        enum : ['Processed','At Service','Delivering','Delivered']
    }
})


mongoose.model('customerOrders',customerOrderSchema);