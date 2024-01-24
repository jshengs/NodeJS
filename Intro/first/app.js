const {readFile} = require("fs");

readFile('./text.txt', 'utf8', (err, data)=>{
    if(err){
        return
    } else{
        console.log(data)
    }
})