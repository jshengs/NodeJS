var express = require("express")
var app = express();

console.log("First task")

// It will run all other console log first only run this function
setTimeout(() => {
    console.log("Second task")
}, 500)

//host on website
app.get('/home', function(req,res){
    res.send("home")
})
console.log("Third task")
console.log("Fourth task")

app.listen(8080);