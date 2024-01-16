var counter = function(arr){ 
    return 'There are ' + arr.length + ' elements in the array';
}

var adder = function(a,b){
    return `The sum is ${a+b}`;
}

var pi = 3.142;

//stuff is module.exports
//in app.js just put stuff.____

module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;