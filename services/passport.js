const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const Customer = mongoose.model('customers');
const Retailer = mongoose.model('retailers');
const Service = mongoose.model('services');

passport.serializeUser((user, done) => {
    cookieBucket = {
        id : user.id,
        badge : user.badge,
        initialized : user.initialized
    }
    done(null, cookieBucket)
})

passport.deserializeUser(async (cookieBucket, done) => {
    switch (cookieBucket.badge) {
        case 'CUSTOMER':
            return done(null, await Customer.findById(cookieBucket.id))
        case 'RETAILER':
            return done(null, await Retailer.findById(cookieBucket.id))
        case 'SERVICE':
            return done(null, await Service.findById(cookieBucket.id))
        default:
            return done(null, cookieBucket)
    }
    
    
})

passport.use(new GoogleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/return',
    proxy : true
},async  (accessToken, refreshToken, profile, done) => {
    if (mongoose.connection.readyState == 0) console.log('DB not connected');
    // if its an returning user
    // and its Customer 
    let existingUser = await Customer.findOne({googleId : profile.id})
    if (existingUser) return done(null, existingUser)
    // or its Retailer
    let existingUser2 = await Retailer.findOne({googleId : profile.id})
    if (existingUser2) return done(null, existingUser2)
    // or its Service Man 
    let existingUser3 = await Service.findOne({googleId : profile.id});
    if(existingUser3) return done(null,existingUser3)
    // if the function reaches here , it means its a new user, so we will setup a signup status 
    done(null, {
        id : profile.id,
        badge : 'NOT_INITIALIZED',
        initialized: false
    })
}))