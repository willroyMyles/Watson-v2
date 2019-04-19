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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log("listening on port "+ port);