var fs = require('fs');

// fs.unlink('writeMe.txt');

//create directory
// fs.mkdirSync('addNew');

fs.mkdirSync('addNew', function(){
    fs.readFile('readMe.txt', 'utf8', function(err, data){
        fs.writeFile('./addNew/writeMe2.txt', data);
    });
});

//remove directory
// fs.rmdirSync('addNew');