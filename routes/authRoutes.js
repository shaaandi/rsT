const mongoose = require('mongoose');
const passport = require('passport');
const middlewares = require('../middlewares/authMiddlewares');
const Customer = mongoose.model('customers');
const Retailer = mongoose.model('retailers');
const Service = mongoose.model('services');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope : ['profile', 'email']
    }))

    app.get('/auth/google/return', passport.authenticate('google') ,(req,res) => {
        if (req.user.badge === 'NOT_INITIALIZED'){
            res.redirect('/user/initialize')
        } else {
            res.redirect('/')
        }
        
        
    })

    app.get('/api/currentUser', (req,res) => {
        res.send(req.user)     
    })

    app.get('/api/logout', (req,res) => {
        req.logOut();
        res.redirect('/')
    })

    app.post('/api/setUserBadge', middlewares.checkUserLogin, async(req,res) => {
        if (req.user.initialized) {
            return res.send('Already Initialized').status(404);
        }
        let user;
        const badge = req.body.badge;
        if (badge === 'CUSTOMER') {
            user = await new Customer({googleId : req.user.id, badge: badge, initialized: true}).save()
            if(user){
                req.logOut();
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    return res.send(user)
                });
            }
        }
        else if (badge === 'RETAILER') {
            user = await new Retailer({googleId : req.user.id, badge: badge, initialized: true}).save()
            if(user){
                req.logOut();
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    return res.send(user);
                });

            }
        }
        else if (badge === 'SERVICE') {
            user = await new Service({googleId: req.user.id, badge : badge, initialized : true}).save();
            if(user){
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            }
        }

    })



    
}

