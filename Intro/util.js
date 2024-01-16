var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var marry = new Person('marry');
var sonia = new Person('sonia');

var people = [james, marry, sonia];

people.forEach(function(person){
    person.on('speak', function(mssg){
        console.log(person.name + ' said: ' + mssg);
    });
});

james.emit('speak', 'hey dudes');
sonia.emit('speak', 'I want a curry');