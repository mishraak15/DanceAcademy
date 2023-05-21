const express = require('express');
// const fs = require('fs');
const path = require('path');
const app = express();
const port = 800;

var mongoose = require("mongoose");  //declaring the mongoose
// To connect the mongoose

mongoose.connect('mongodb://127.0.0.1:27017/ContactDance',
    {
        useNewUrlParser: true
    }
);

// Declaration of a dance schema
const DanceSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    mobileno: Number,
    address: String,
    medical: String
});

var contact = mongoose.model('contact', DanceSchema)   //Schema ka ek model banaya


//For serving static files
app.use('/static', express.static('static'));
app.use(express.urlencoded({
    extended: true
  }));


//For adding view engine as pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})


app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);

    mydata.save().then(()=>{
        res.send("<h1>This item is send successfully</h1>");
        
    }) .catch(()=>{
        res.status(400).send("Item was not saved in the database");
    })

})
// Starting the server
app.listen(port, () => {
    console.log(`The server started successfully at port ${port}`);
});