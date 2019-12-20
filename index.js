const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI, () => { }, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Atlas Server Connected')
    })
    .catch(err => {
        console.log(err);
    });

mongoose.connection.on("open", function(ref) {
        console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


require('./models/customer');
require('./models/retailer');
require('./models/product');
require('./models/customerOrder');
require('./models/retailerOrder');
require('./models/service')
require('./models/serviceOrder');
require('./services/passport');



app.use(cookieSession({
    maxAge : 15*24*60*60*1000,
    keys : [keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);
require('./routes/retailerRoutes')(app);
require('./routes/customerRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/seedDataRoutes')(app);
require('./routes/serviceRoutes')(app);

const PORT = process.env.PORT || 5000;
if(process.env.NODE_ENV) console.log(process.env.NODE_ENV);
else console.log('Not in production');
if (process.env.NODE_ENV === 'production') {
    console.log('I am called')  
    app.use(express.static('client/build'))

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))