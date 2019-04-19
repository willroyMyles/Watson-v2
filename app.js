var express = require('express');
var app = express();
var controller = require('./controllers/controller');

//enable static files
app.use(express.static('./public'));

//set up template engine ejs
app.set('view engine', 'ejs');

//set up controller
controller(app);

//listen on port for testing
app.listen(3000);
console.log('listening on port 3000');