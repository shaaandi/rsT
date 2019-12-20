// Retailer 1 ,  till kitchen 5d32f94da9daee1e04a9a8ff
// Retailer 2 , rest from kitchen 5d32f980a9daee1e04a9a900
const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Retailer = mongoose.model('retailers')
// const dataTwo = require('../fakeData/dataTwo');
// const images = require('../fakeData/images');

module.exports = (app) => {

    // app.get('/api/seedData/updateRetailerInventory/:retailerId', async(req,res) => {
    //     let products = await Product.find({retailer : req.params.retailerId});
    //     let inventory = await products.map(product => {
    //         return product.id
    //     })
    //     if(inventory){
    //         let updatedRetailer = await Retailer.findByIdAndUpdate(req.params.retailerId,{inventory: inventory},{new:true});
    //         res.send(updatedRetailer)
    //     }
    // })

    // app.get('/api/seedData/createProducts/:retailerId',async  (req,res) => {
    //     let data = dataTwo;
    //     await data.forEach(async(productData) => {
    //         let {title,price, brand,subCategory, quantity,
    //             customer_average_review_rating,
    //             customer_review_count,
    //             category
    //         } = productData;
    //         let imgSrc = await images[Math.floor(Math.random() * 9999)];
    //         let description = 'No desciption yet';
    //         let retailer = req.params.retailerId;
    //         let product = await new Product({
    //             title,
    //             price,
    //             brand,
    //             subCategory,
    //             quantity,
    //             customer_average_review_rating,
    //             customer_review_count,
    //             imgSrc,
    //             description,
    //             category,
    //             retailer
    //         }).save()
    //         if (product) return;
    //     });
    //     res.send('Done, ')
    // })
}