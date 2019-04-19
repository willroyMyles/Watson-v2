var express = require('express');
var app = express();
var controller = require('./controllers/controller');
var documentController = require('./controllers/documentController');

//enable static files
app.use(express.static('./public'));

//set up template engine ejs
app.set('view engine', 'ejs');

//setUp document controller
documentController(app);

//set up controller
//controller(app);

//listen on port for testing
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log("listening on port "+ port);