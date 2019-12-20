const mongoose = require('mongoose');

const retailerOrderSchema = new mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    customerOrderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customerOrders'
    },
    products : [
        {
            type  :mongoose.Schema.Types.ObjectId,
            ref  : 'products'
        }
    ],
    productsQuantity : {
        type : Map,
        of : Number
    },
    tAmount : {
        type : Number,
        default : 0
    },
    serviceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'services'
    },
    customerAddress : String,
    status : {
        type : String,
        default : 'Processed',
        enum : ['Processed','Pending','Received']
    }
})

mongoose.model('retailerOrders',retailerOrderSchema);