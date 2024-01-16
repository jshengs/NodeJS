var express = require('express');
var app5 = express();

const fs = require("fs")
app5.set('view engine', 'ejs');
 app5.use('/assets', express.static('assets'));

// app5.use('/assets', function(req, res, next){
//     console.log(req.url);
//     next();
// });

// app5.use('/assets', function(req, res, next){
//     console.log(req.url);
//     next();
// });

// app5.use('/assets', express.static('assets'));
    

 app5.use('/', function(req, res){
        // console.log(req.url);
        
        res.render("home", {qs: req.query});


    });


app5.get('/', function(req, res){
        res.render("home");

});

app5.get('/contact', function(req, res) {
    let html = fs.readFileSync("./contact.html");
    res.write(html)
});

// app5.get('/profile/:id', function(req, res){
//     res.send('You requested to see a profile with the id of ' + req.params.id);
// });

// app5.get('/profile/:name', function(req, res){
//     res.send('You requested to see a profile with the name of ' + req.params.name);
// });

app5.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'Ninja', hobbies:['eating', 'fighting', 'fishing']};
    res.render('profile', {person: req.params.name, data: data});
});


// app5.get('/', function(req, res){
//     res.sendFile(__dirname + '/contact.html');
// });

app5.listen(3000);