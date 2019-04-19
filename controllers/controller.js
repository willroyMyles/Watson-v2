var bodyParser= require('body-parser').urlencoded({extended:false});
var mongoose = require('mongoose'); // database manager
var watson = require('./watsonController');



module.exports = (app) =>{

    watson(app);
//    setTimeout(() => {
//        watson.sendMessage('hi');
//    }, 2000);
    




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

    app.post('/chat', bodyParser, async function(req,res){
        async function sen(item){
            console.log(item);
            res.send(item);
        }
       
        await watson.sendMessage(req.body.item, sen);
    });

}