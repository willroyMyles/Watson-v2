var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose');

module.exports = (app) =>{
    //set login route
    app.get('/index', (req, res) =>{
        res.render('index');
    });
    app.get('/', (req, res) =>{
        res.render('index');
    });

    app.get('/chat', (req, res) =>{
        res.render('chat1');
    });

}