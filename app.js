const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/user'); 
const mongoose = require('mongoose');
const config = require('./config/config');

/* connecting the mongoDB */ 
mongoose.connect(config.database , err => {
    
    if(err) {
        console.log('Error!' + err);
    } else {
        console.log('Connected to MongoDB');
    }
}) ;
 


// Initialize the express
const app = express();

app.use(bodyParser.json());

// PORT TO RUN THE SERVER
const PORT = '3000';

/* Initialize the route */ 
app.use('/' , route);




app.listen(PORT , function(req,res){
    console.log('server listening on port' + PORT);
})
