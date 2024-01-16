// var express = require('express');

// var app4 = express();
// const fs = require("fs")
// app5.set('view engine', 'ejs');

// app4.get('/', function(req, res) {
//     res.send('This is the homepage');
// });

// app4.get('/profile/:name', function(req, res){
//     var data = {age: 29, job: 'Ninja', hobbies:['eating', 'fighting', 'fishing']};
//     res.render('profile', {person: req.params.name, data: data});
// });

// app4.listen(3000);



var express = require('express');
var app5 = express();

const fs = require("fs")
app5.set('view engine', 'ejs');
 app5.use('/assets', express.static('assets'));

app5.get('/', function(req, res){
        res.render("home");
});

// app5.get('/contact', function(req, res) {
//     let html = fs.readFileSync("./contact.html");
//     res.write(html)
// });

app5.get('/contact', function(req, res) {
    res.render('contact', {qs: req, res});
});

app5.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'Ninja', hobbies:['eating', 'fighting', 'fishing']};
    res.render('profile', {person: req.params.name, data: data});
});

app5.listen(3000);