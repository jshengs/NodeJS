var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)"; //change color. Will take fill style before the c.fillRect

// c.fillRect(100, 100, 100, 100); //(x, y, width, height)
// c.fillStyle = "rgba(1, 0, 0, 0.5)";
// c.fillRect(300, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 128, 1)";
// c.fillRect(500, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(700, 100, 100, 100);

//console.log(canvas);

// Line
// c.beginPath();
// c.moveTo(50, 300); //(x,y)
// c.lineTo(300, 100); //(x,y)
// c.lineTo(400, 300);
// c.strokeStyle = "red"; //change color
//c.stroke(); //call this function to show the line 

// Arc/Circle
 //c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI *2, false); //(x: Int, y: Int, radius: Int, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false)); 
                                          //startAngle -> where u want the arc to start. endAngle -> how long do the angle to go on for

// c.strokeStyle = "blue";
// c.stroke();

// for(var i = 0; i<3; i++){ //repeat for x times
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI *2, false); 
//     c.strokeStyle = "blue";
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

var colorArray = ['blue','green', 'red', 'pink', 'yellow'];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw =  function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = "blue";
        // c.stroke();
        c.fillStyle = this.color;//array start from 0
        c.fill(); //circle fill color
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){ //circle bounce left and right within the screen
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy; //reverse the velocity
        }

        this.x += this.dx; //moving speed 1px/frame
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }
        }

        else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

for(var i = 0; i < 400; i++){
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) ; //velocity// speed for x
    var dy = (Math.random() - 0.5) ; //speed for y

    circleArray.push(new Circle(x, y, dx, dy, radius));
    //var circle = new Circle(200, 200, 3, 3, 30);

}

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8; //velocity// speed for x
var dy = (Math.random() - 0.5) * 8; //speed for y
var radius = 30;

var circleArray = [];


function init(){
    circleArray = [];
    for(var i = 0; i < 400; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) ; //velocity// speed for x
        var dy = (Math.random() - 0.5) ; //speed for y
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate); //create a loop
    c.clearRect(0, 0, innerWidth, innerHeight); //remove duplicate circle

    // circle.draw();
    //circle.update();

    // c.beginPath();
    // c.arc(x, y, radius, 0, Math.PI *2, false);
    // c.strokeStyle = "blue";
    // c.stroke();

    // if(x + radius > innerWidth || x - radius < 0){ //circle bounce left and right within the screen
    //     dx = -dx;
    // }

    // if(y + radius > innerHeight || y - radius < 0){
    //     dy = -dy; //reverse the velocity
    // }

    // x += dx; //moving speed 1px/frame
    // y += dy;

    for (var i = 0; i < circleArray.length; i++){
        	circleArray[i].update();
    }
}
init();
animate();