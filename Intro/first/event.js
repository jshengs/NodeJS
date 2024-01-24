const eventEmitter = require('events');
const customEmitter = new eventEmitter;

//listen to event(s) using .on
// customEmitter.on('response', () =>{
//     console.log('data received');
// });

customEmitter.on('response', (username, id) =>{
    console.log('data received ${username}');
});

// customEmitter.on('response', () =>{
    customEmitter.on('response', () =>{
    console.log('Testing ...');
});

//execute the event(s) using .emit
customEmitter.emit('response', 'John', 55);