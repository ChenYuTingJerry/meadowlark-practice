const express = require('express');
const fortune = require('./lib/fortune');

const app = express();

const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

// template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// port
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// middleware
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// router
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js' 
    });
});

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate');
});

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});