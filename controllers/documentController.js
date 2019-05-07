var bodyParser = require('body-parser').urlencoded({ extended: false });
var mongoose = require('mongoose'); // database manager
mongoose.connect('mongodb+srv://user:password.@watson-utech-assistant-xkgae.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
var User = require('../models/user');
var swal = require('sweetalert2');
var Spec = require('../models/Specializations');



module.exports = (app) => {

    console.log('documnet conroller loaded');


    app.post('/swal', (req, res) => {
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
    });

    var watson;
    var user = User();

    //set login route
    app.get('/index', (req, res) => {
        res.render('chat3');
    });

    app.get('/', (req, res) => {
        res.render('login');
    });
    app.get('/signin', (req, res) => {
        res.render('login');
    });
    app.get('/signup', (req, res) => {
        res.render('login');
    });
    app.get('/chat', (req, res) => {
        res.render('chat3');
    });

    app.post('/signin', bodyParser, async(req, res) => {

        console.log(req.body)

        await User.findOne({ username: req.body.user_username, password: req.body.user_password }, (err, data) => {

            if (data == null) {
                res.render('login');
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

        console.log(req.body);

        var user = { username: req.body.user_username, password: req.body.user_password, question: [] };

        User(user).save(function(err, data) {
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

    app.post('/specialization', bodyParser, async(req, res) => {
        async function information(info) {
            res.send(info);
        }

        var spec = new Spec();
        spec.getInfo(req.body.item, information);
    });

    app.post('/chart', bodyParser, async(req, res) => {
        async function information(info) {
            res.send(info);
        }
        var spec = new Spec();
        spec.getSpecializations(information);
    });

    app.post('/say', bodyParser, async(req, res) => {
        console.log(req.body);
        var msg = new SpeechSynthesisUtterance('Hello World');
        window.speechSynthesis.speak(msg);

    });

}