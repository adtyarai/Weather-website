const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlerbar engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Aditya Rai'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About My Robot',
        name: 'Aditya Rai'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aditya Rai',
        message: 'You can connect with us on 123 for any kind of help.'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) return res.send({error: 'You must provide an address term!'})

    const address = req.query.address;
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({error: error})
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) return res.send({error:error});

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'Must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title: '404',
        name: 'Aditya Rai',
        message: 'Help article not found.'
    })
})

// * is wildcard match - match anything which hasn't been matched.
app.get('*',(req,res) => {
    res.render('error',{
        title: '404',
        name: 'Aditya Rai',
        message: 'Page not found!'
    })
})

app.listen(port, () => console.log('Server is up on port on '+port))