const mongoose = require('mongoose');
mongoose.set('debug', true);
const productSchema = new mongoose.Schema({
    title : String,
    price : Number,
    retailer : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'retailers'
    },
    // Brand approval will also be considered 
    brand : {
        type : String,
        default : 'Unbranded'
    },
    description: {
        type : String,
        default : ''
    },
    imgSrc : {
        type : String,
        default : ''
    },
    quantity : {
        type : String,
        default : '0'
    },
    category : {
        type : String,
        default : 'Uncategorized'
    },
    sold : {
        type : Number,
        default : 0
    },
    customer_average_review_rating : Number,
    customer_review_count : Number,
    subCategory : {
        type : String,
        default : 'Uncategorized'
    }
    //Rating will also be another prominent feature
    
})

mongoose.model('products', productSchema);