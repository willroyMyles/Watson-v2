var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose'); // database manager
mongoose.connect('mongodb+srv://user:password.@watson-utech-assistant-xkgae.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
var User = require('../models/user');

module.exports = (app) =>{

  var watson;
  var user = User();

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
      res.render('signin');
      console.log('data is null');
    }else{
      console.log(data);
    
      user.username = data.username;
      user.password = data.password;
      user.question = data.question;
      
      watson = require('./watsonController');
      watson(app);
      res.redirect('/chat');
    }
    });
  });

 

  app.post('/signup',bodyParser, (req,res)=>{
    
      User(req.body).save(function(err,data){
      if(err) throw err;
      res.redirect('signin');
    })
  });



    app.post('/chat', bodyParser, async function(req,res){
        async function sen(item, optionalArgument){
          if(optionalArgument!== undefined){
            user.question.push(optionalArgument);
            let result = await User.updateOne({username: user.username, password: user.password}, {question: user.question}, (err, data)=>{
              console.log(data);
            });
          }
            console.log(item);
            res.send(item);
        }
        await watson.sendMessage(req.body.item, sen);
    });

}