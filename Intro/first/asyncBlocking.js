const express = require("express");
const app = express();

app.get('/home', (req, res) =>{
    res.end(`<h1>Home Page</h1>`)
})

app.get('/about', (req, res) =>{
    res.end(`<h1>About Page</h1>`)
    //Blocking Code
    for(let i = 0; i < 1000; i++){
        for(let j = 0; j < 1000; j++){
            console.log(`${i} ${j}`)

        }
    }
})

app.listen(8080);