var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    console.log('Hello'); 
   // res.status('Hello to User'); // send to User
   // res.status(404).send('Noob'); //print msg with hidden error
   // res.download('express.js'); //direct download to hard drive
   res.render('profile');
});

app.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'Ninja', hobbies:['eating', 'fighting', 'fishing']};
    res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);