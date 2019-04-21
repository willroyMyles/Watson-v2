var bodyParser = require('body-parser').urlencoded({ extended: false });
var mongoose = require('mongoose'); // database manager
mongoose.connect('mongodb+srv://user:password.@watson-utech-assistant-xkgae.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
var User = require('../models/user');
var Item = require('../models/item');
var parse5 = require('parse5');


module.exports = (app) => {



    var request = require('request');
    var cheerio = require('cheerio');
    request('https://www.payscale.com/college-salary-report/majors-that-pay-you-back/bachelors?orderBy=MajorName&search=information systems', (err, res, body) => {
        var $ = cheerio.load(body);
        var tableBody = $('tbody');
        var tableRow = tableBody.find('tr');


        var counter = 0;
        var array = [];

        tableRow.each(function(i, elem) {
            console.log(counter);
            console.log($(this).children().children().text());

            if (counter == 2 || counter == 4 || counter == 5 || counter == 6) array.push($(this).children().children().text());
            counter++;
            if (counter >= 7) counter = 0;
        });
    });


    var watson;
    var user = User();

    //set login route
    app.get('/index', (req, res) => {
        res.render('signin');
    });
    app.get('/', (req, res) => {
        res.render('signin');
    });
    app.get('/signin', (req, res) => {
        res.render('signin');
    });
    app.get('/signup', (req, res) => {
        res.render('signup');
    });
    app.get('/chat', (req, res) => {
        res.render('chat1');
    });

    app.post('/signin', bodyParser, async(req, res) => {
        await User.findOne({ username: req.body.username, password: req.body.password }, (err, data) => {

            if (data == null) {
                res.render('signin');
                console.log('data is null');
            } else {
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



    app.post('/signup', bodyParser, (req, res) => {

        User(req.body).save(function(err, data) {
            if (err) throw err;
            res.redirect('signin');
        })
    });



    app.post('/chat', bodyParser, async function(req, res) {
        async function sen(item, optionalArgument) {
            if (optionalArgument !== undefined) {
                user.question.push(optionalArgument);
                let result = await User.updateOne({ username: user.username, password: user.password }, { question: user.question }, (err, data) => {});
            }
            res.send(item);
        }

        async function results(item) {
            console.log(item);
            res.send(item);
        }


        await watson.sendMessage(req.body.item, sen, results);
    });

}