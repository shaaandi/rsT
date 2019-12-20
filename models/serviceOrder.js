const mongoose = require('mongoose');

const serviceOrderSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  :'services'
    }, 
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'services'
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
    }],
    productsQuantity: {
        type : Map,
        of : Number
    },
    customerOrderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customerOrders'
    },
    dateOfSending : Date,
    dateOfRecieving : Date,
    status : {
        type : String,
        default: 'Pending',
        enum : ['Processed','Pending','Received']
    },
    tAmount : {
        type : Number,
        default : 0
    }

})

mongoose.model('serviceOrders', serviceOrderSchema)