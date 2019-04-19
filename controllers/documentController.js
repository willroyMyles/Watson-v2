var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose'); // database manager


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
  app.post('/signup', (req,res)=>{
    res.render('signin');
  });



    app.post('/chat', bodyParser, async function(req,res){
        async function sen(item){
            console.log(item);
            res.send(item);
        }
       
        await watson.sendMessage(req.body.item, sen);
    });

}