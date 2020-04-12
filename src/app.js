const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
const app = express();
const path = process.env.port || 8000

// Define paths for express config
const publicDirectoryPath = path.join('__dirname',"../public");
const viewsPath = path.join('__dirname',"../templates/views");
const partials = path.join('___dirname','../templates/partials');

// Set up handlebars engine and views engine
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partials);

// Setting up static resources 
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather 🌏'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About'
    }); 
 })
 
 app.get('/help',(req,res)=>{
     res.render('help',{
         title:'Help'
     });
 })

app.get('/weather',(req,res)=>{
    const location = req.query.address;
    if(!location){
        return res.send({
            error:"You must provide a address"
        })
    }
    geocoding(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                location,
                forcastData
            })
        })
    })
})

app.use('/help/*',(req,res)=>{
    res.render('404',{
        error:"Help Article not found"
    })
})

app.use('*',(req,res)=>{
    res.render('404',{
        error:"Page not found"
    })
})

app.listen(port,()=>{
    console.log("I am running at port 8000")
})  