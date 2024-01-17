var express = require('express');
var app = express();
const fs = require("fs");

app.get('/coach/:name', function(req, res){
    res.render('coach', {person: req.params.name});
});

app.listen(3000);