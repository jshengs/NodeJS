const names = require('./name.js'); //module.exports()'
const sayHi = require('./util.js');
require('./number.js');


// console.log(names)
sayHi(names.jun)
sayHi(names.eileen)
sayHi("Jun")

console.log(`Welcome back ${names.jun}`)