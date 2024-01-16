var fs = require('fs');

// var readMe = fs.readFileSync('readMe.txt', 'utf8');

// fs.readFile ('readMe.txt', 'utf8', function(err, data){
//     console.log(data);
// });
// console.log('test');

fs.readFile ('readMe.txt', 'utf8', function(err, data){
    fs.writeFile('writeMe.txt', data);
});


//console.log(readMe);
// fs.writeFileSync('writeMe.txt', readMe);

//code