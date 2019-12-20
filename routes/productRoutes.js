const mongoose = require('mongoose');
const queryString = require('query-string');
const Product = mongoose.model('products')
module.exports = (app) => {
    app.get('/api/products',async (req,res) => {
        Product.find({}, (err,products) => {
            res.send(products)
        })
    })
    app.get('/api/products/:id', async (req,res) => {
        let product = await Product.findById(req.params.id);
        res.send(product);
    })

    app.get('/api/products/:id/similarProducts', async(req,res) => {
        let product = await Product.findById(req.params.id);
        let products = await Product.find({category : product.category}).limit(5)
        let similarProducts = products.filter(p => {
            if(p.id === product.id) return false;
            else return true;
        })
        res.send({
            type : product.category,
            products : similarProducts
        })
    })

    app.get('/api/search/product/titleSearch/:title', async (req,res) => {
        let query = req.params.title;
        let filters = req.query;
        let {brands, subCategories, categories, minPrice, maxPrice, minRating, pageNum, sortField, sortOrder} = filters;
        if(!sortField) sortField = 'customer_average_review_rating';
        if(!sortOrder) sortOrder = 'desc'
        let skipMulti = (pageNum) ? pageNum : 1;
        // Response ---------------------
        let relatedCategories = await Product.find({ "title": { "$regex": query, "$options": "i" } }).distinct('category')
        let relatedBrands = await Product.find({ "title": { "$regex": query, "$options": "i" } }).distinct('brand');
        let relatedSubCategories = await Product.find({ "title": { "$regex": query, "$options": "i" } }).distinct('subCategory');
        let totalResultCount = await Product.count({ 
            "title": { "$regex": query, "$options": "i" },
            brand : (brands) ? {$in: brands} : {$nin: ['none']},
            subCategory : (subCategories) ? {$in : subCategories} : {$nin : ['none']},
            category  : (categories) ? {$in : categories} : {$nin : ['none']},
            price : {$gte : (minPrice) ? minPrice : 0, $lte : (maxPrice) ? maxPrice : Infinity},
            customer_average_review_rating : {$gte : (minRating) ? minRating : 0}
        });
        let products = await Product.find({ 
            "title": { "$regex": query, "$options": "i" },
            brand : (brands) ? {$in: brands} : {$nin: ['none']},
            subCategory : (subCategories) ? {$in : subCategories} : {$nin : ['none']},
            category  : (categories) ? {$in : categories} : {$nin : ['none']},
            price : {$gte : (minPrice) ? minPrice : 0, $lte : (maxPrice) ? maxPrice : Infinity},
            customer_average_review_rating : {$gte : (minRating) ? minRating : 0}
        }).sort({[sortField] : sortOrder}).skip(20*(skipMulti-1)).limit(20)
        res.send({
            products,
            relatedCategories,
            relatedBrands : relatedBrands.sort(),
            relatedSubCategories : relatedSubCategories.sort(),
            totalResultCount
        })

        // ----------------------------------
    })
    // `subCategory=${subCategory}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}&pageNum=${pageNum}`
    app.get('/api/search/category/:category', async(req,res) => {
        let obj = req.query;
        let category = req.params.category;
        let brand = (obj.brand === 'undefined') ? false : obj.brand
        let minPrice = (obj.minPrice === 'undefined') ? false : obj.minPrice
        let subCategory = (obj.subCategory === 'undefined') ? false : obj.subCategory
        let maxPrice = (obj.maxPrice === 'undefined') ? false : obj.maxPrice
        let sortingField = (obj.sortField === 'undefined') ? 'customer_average_review_rating' : obj.sortField;
        let sortOrder = (obj.sortOrder === 'undefined') ? 'desc' : obj.sortOrder;
        let pageNum = (obj.pageNum === 'undefined') ? 1 : obj.pageNum
        let subCategories = await Product.find({category :category}).distinct('subCategory')
        let brands = await Product.find({category :category}).distinct('brand')
        let allResultsCount = await Product.count({
            category : category,
            subCategory : subCategory || {$nin: ['none']},
            brand : brand || {$nin : ['none']},
            price : {$gte : minPrice || 0, $lte : maxPrice || Infinity}
        });
        let products = await Product.find({
            category : category,
            subCategory : subCategory || {$nin: ['none']},
            brand : brand || {$nin : ['none']},
            price : {$gte : minPrice || 0, $lte : maxPrice || Infinity}
        }).sort({[sortingField] : sortOrder}).skip(20*(pageNum-1)).limit(20)
        res.send({
            products : products,
            subCategories : subCategories,
            brands : brands,
            allResultsCount
        })

        
    })
}