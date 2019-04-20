var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose'); // database manager
mongoose.connect('mongodb+srv://user:password.@watson-utech-assistant-xkgae.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
var User = require('../models/user');
var watson;
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
  app.get('/chat', (req, res) =>{
    res.render('chat1');
  });

  app.post('/signin',bodyParser, async (req,res)=>{
    await User.findOne({username: req.body.username, password: req.body.password },(err,data)=>{
 
    if(data == null){
      //res.render('signin');
      console.log('data is null');
    }else{
      console.log(data);
      watson = require('./watsonController');
      watson(app);
      res.redirect('/chat');
    }
    });
  });

  app.post('/signup',bodyParser, (req,res)=>{
    
    var user = User(req.body).save(function(err,data){
      if(err) throw err;
      res.redirect('signin');
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