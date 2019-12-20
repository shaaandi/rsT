const mongoose = require('mongoose');
const Service = mongoose.model('services');
const RetailerOrder =  mongoose.model('retailerOrders');
const CustomerOrder = mongoose.model('customerOrders');
const ServiceOrder = mongoose.model('serviceOrders');

const authVerification = (req,res,next) => {
    if(!req.user) return res.send(false)
    if(req.user.badge === 'SERVICE') next();
    else {
        return res.send('Unauthorized')
    }
}

module.exports = (app) => {
    app.get('/api/service', authVerification,async (req,res) => {
        let service = await Service.findById(req.user.id);
        let allServices = await Service.find({})
        let otherServices = await allServices.filter(service => {
            return service.id !== req.user.id
        })
        res.send({
            profile : service,
            otherServices
        })
    })

    app.post('/api/service', authVerification,async(req,res) => {
        const data = req.body;
        let options = {
            new : true
        }
        let user = await Service.findByIdAndUpdate(req.user.id, data, options)
        res.send(user)
    })

    app.get('/api/service/:mode', authVerification,async(req,res) => {
        const service = await Service.findById(req.user.id).populate(`${req.params.mode}`);
        if(service){
            let section = `${req.params.mode}`
            res.send(service[section])
        }
    })
    app.get('/api/service/:mode/:id', authVerification,async(req,res) => {
        if (req.params.mode === 'retailerOrders'){
            let order = await RetailerOrder.findById(req.params.id).populate('customerOrderId').populate('products');
            if (order) {
                let allServices =await  Service.find({})
                let services = await allServices.filter((s) => {
                    if(s.id === req.user.id) return false;
                    else return true;
                })
                if(services) res.send({
                    order : order,
                    services : services
                })
            }

            
        }
        else if (req.params.mode === 'serviceOrders'){
            let order = await ServiceOrder.findById(req.params.id).populate('customerOrderId').populate('products')
            if (order) res.send(order)
        }
        else if (req.params.mode === 'customerOrders'){
            let order = await CustomerOrder.findById(req.params.id)
            .populate('products')
            .populate('customerId')
            if(order) res.send(order)
        }

    })
    app.post(`/api/service/:mode/:orderId`, authVerification,async (req,res) => {
    if(req.params.mode === 'retailerOrders'){
        let retailerOrder = await RetailerOrder.findByIdAndUpdate(req.params.orderId, {status : 'Recieved'}, {new : true})
        .populate('customerOrderId')
        // Products Sold counter will be incremented . 
        if (!req.body.forward){
            let customerOrder = await retailerOrder.customerOrderId; // customerOrder populated
            let retailerProducts = await retailerOrder.products.map(p => p.toString())
            await retailerProducts.forEach(product => {
                if(customerOrder.productsStatus.get(product) !== undefined){
                    customerOrder.productsStatus.set(product, true)
                }
            })
            let complete;
            customerOrder.productsStatus.forEach(status => {
                if (status === false) {
                    complete = false
                }
            })
            if(complete !== false) complete = true;
            let status;
            complete ? status = 'At Service' : status = 'Processed';
            let updatedCustomerOrder = await CustomerOrder.findByIdAndUpdate(customerOrder.id,{productsStatus : customerOrder.productsStatus, status : status, deliveringService : req.user.id},{new:true})
            if (updatedCustomerOrder){
                req.user.customerOrders.addToSet(updatedCustomerOrder.id);
                let customerOrders = req.user.customerOrders;
                let updatedService = await Service.findByIdAndUpdate(req.user.id, {customerOrders : customerOrders},{new : true})
                .populate('retailerOrders')
                res.send(updatedService)
            }
        }
        else  {
            // forwarding the retailer's order to another service,

            let senderId = req.user.id;
            let recieverId = req.body.recieverId;
            let products = retailerOrder.products;
            let productsQuantity = retailerOrder.productsQuantity;
            let customerOrderId = retailerOrder.customerOrderId.id;
            let tAmount = retailerOrder.tAmount
            let status = 'Pending';
            let serviceOrder = await new ServiceOrder({
                senderId,
                recieverId,
                products,
                productsQuantity,
                customerOrderId,
                status,
                tAmount
            }).save()
            let customerOrder = await retailerOrder.customerOrderId;
            let customerOrderMiddleServices = await customerOrder.middleServices;
            customerOrderMiddleServices.addToSet(req.user.id);
            let updatedCustomerOrder = await CustomerOrder.findByIdAndUpdate(customerOrder.id,{middleServices : customerOrderMiddleServices},{new:true})
            if (updatedCustomerOrder){
                let recievingService = await Service.findById(serviceOrder.recieverId)
                let recievingServiceServiceOrders = recievingService.serviceOrders;
                recievingServiceServiceOrders.push(serviceOrder.id)
                let updatedRecievingService = await Service.findByIdAndUpdate(recievingService.id,{serviceOrders : recievingServiceServiceOrders}, {new : true})

                if(updatedRecievingService){
                    let sendingService = await Service.findById(req.user.id)
                    let sendingServiceServiceOrders = sendingService.serviceOrders;
                    sendingServiceServiceOrders.push(serviceOrder.id)
                    let updatedSendingService = await Service.findByIdAndUpdate(sendingService.id,{serviceOrders : sendingServiceServiceOrders}, {new : true})
                    res.send(updatedSendingService)
                }
            }
        }
    }
    else if(req.params.mode === 'serviceOrders'){
        let serviceOrder = await ServiceOrder.findByIdAndUpdate(req.params.orderId, {status : 'Recieved'}, {new : true})
        .populate('customerOrderId')

        if (!req.body.forward){
            let customerOrder = await serviceOrder.customerOrderId; // customerOrder populated
            let serviceProducts = await serviceOrder.products.map(p => p.toString())
            await serviceProducts.forEach(product => {
                if(customerOrder.productsStatus.get(product) !== undefined){
                    customerOrder.productsStatus.set(product, true)
                }
            })
            let complete;
            customerOrder.productsStatus.forEach(status => {
                if (status === false) {
                    complete = false
                }
            })
            if(complete !== false) complete = true;
            let status;
            complete ? status = 'At Service' : status = 'Processed';
            let updatedCustomerOrder = await CustomerOrder.findByIdAndUpdate(customerOrder.id,{productsStatus : customerOrder.productsStatus, status : status, deliveringService : req.user.id},{new:true})
            if (updatedCustomerOrder){
                req.user.customerOrders.addToSet(updatedCustomerOrder.id);
                let customerOrders = req.user.customerOrders;
                let updatedService = await Service.findByIdAndUpdate(req.user.id, {customerOrders : customerOrders},{new : true})
                .populate('serviceOrders')
                res.send(updatedService)
            }
        }
    }
    else if (req.params.mode === 'customerOrders'){
        let customerOrder = await CustomerOrder.findByIdAndUpdate(req.params.orderId,{status : req.body.setStatus}, {new : true});
        res.send(customerOrder)
    }
    else {
        res.send('Invalid mode')
    }
    })
}