const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const mongoose = require('mongoose');
const Customer = mongoose.model('customers');
const Retailer = mongoose.model('retailers');
const RetailerOrder = mongoose.model('retailerOrders');
const CustomerOrder = mongoose.model('customerOrders');

const authVerification = (req,res,next) => {
    if(!req.user) return res.send(false)
    if(req.user.badge === 'CUSTOMER') next();
    else {
        console.log('Unauthorized')
        return res.send('Unauthorized')
        
    }
} 

module.exports = (app) => {
    app.post('/api/customer/order', authVerification, async (req,res) => {

        await stripe.charges.create({
            amount : req.body.amount,
            currency : 'usd',
            description : 'Amount is right',
            source : req.body.token.id
        })
        
        let customer = await  Customer.findById(req.user.id).populate('cart')
        let customerOrdersProductsStatus = new Map();
        await customer.cart.forEach(p => {
            if(customerOrdersProductsStatus.get(p) === undefined) customerOrdersProductsStatus.set(p.id,false)
        })
        let customerOrder = await new CustomerOrder({
            customerId : req.user.id,
            retailers : [],
            products : req.user.cart,
            productsQuantity : customer.cartQuantity,
            tAmount : req.body.amount,
            shippingAddress : req.body.shippingAddress,
            productsStatus : customerOrdersProductsStatus

        })
        await customer.cart.forEach((p) => {
            customerOrder.retailers.addToSet(p.retailer)
        })
        await customer.customerOrders.push(customerOrder._id)
        await customerOrder.save()
        await customerOrder.retailers.forEach( async (retailer) => {
            let retailerAmount = 0;
            let retailerProductsId = [] 
            let quantity = {}
            customer.cart.forEach((p) => {
                let retailerId =  p.retailer.toString()
                if(retailerId === retailer.toString()){
                    let quantum = customer.cartQuantity.get(p.id)
                    retailerAmount = retailerAmount + (p.price*quantum)
                    retailerProductsId.push(p.id)
                    quantity[p.id] = quantum;      
                }
            })
            let retailerOrder = await new RetailerOrder({
                customerId : req.user.id,
                customerOrderId : customerOrder.id,
                products : retailerProductsId,
                productsQuantity : quantity,
                tAmount : retailerAmount,
                customerAddress : customer.address
            }).save()
            let retailerModel = await Retailer.findById(retailer);
            await  retailerModel.retailerOrders.push(retailerOrder.id)
            await retailerModel.save()
        })
        let customerOrders =await  customer.customerOrders
        let updatedCustomer = await Customer.findByIdAndUpdate(customer.id,{customerOrders,cart: [], cartQuantity: {}},{new : true})
        Customer.findById(updatedCustomer.id).populate('wishList').populate('cart').populate('customerOrders').exec((err,customer) => {
            if(err) res.send(err);
            res.send(customer)
        })
        
    })
}