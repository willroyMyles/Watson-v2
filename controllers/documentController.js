var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose'); // database manager
mongoose.connect('mongodb+srv://user:password.@watson-utech-assistant-xkgae.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
var User = require('../models/user');

module.exports = (app) =>{

    //set login route
    app.get('/index', (req, res) =>{
        res.render('signin');
    });
    app.get('/', (req, res) =>{
        res.render('signin');
    });
    app.get('/signin', (req, res) =>{
      res.render('signin');
  });
  app.get('/signup', (req, res) =>{
    res.render('signup');
  });

  app.post('/signin', (req,res)=>{
    console.log('sign in called');
    res.render('signup');
  });
  app.post('/signup',bodyParser, (req,res)=>{
    
    var user = User(req.body).save(function(err,data){
      if(err) throw err;
      res.json(req.body);
    })

    //res.render('signin');
  });



    app.post('/chat', bodyParser, async function(req,res){
        async function sen(item){
            console.log(item);
            res.send(item);
        }
       
        await watson.sendMessage(req.body.item, sen);
    });

}