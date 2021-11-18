/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
// app.use('/welcome', require('./welcome.js'));
app.use('/activities_manage', require('./activities_manage.js'));
app.use('/customers_manage', require('./customers_manage.js'));
app.use('/genders_manage', require('./genders_manage.js'));
app.use('/orders_manage', require('./orders_manage.js'));
app.use('/orders_products_manage', require('./orders_products_manage.js'));
app.use('/products_manage', require('./products_manage.js'));
app.use('/stores_manage', require('./stores_manage.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
