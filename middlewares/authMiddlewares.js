module.exports = {
    checkUserLogin : (req,res,next) => {
        if (req.user){
            next()
        }
        else {
            res.send('User not Logged In')
        }
    }, 

    checkUserInitialized : (req,res,next) => {
        if (req.user.badge === 'NOT_INITIALIZED') {
            res.send('User Not Initialized').status(403)
            
        }
        else {
            next()
        }
    }
}