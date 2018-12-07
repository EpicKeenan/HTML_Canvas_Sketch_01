var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


//c.fillStyle = "white";
//c.fillRect(100,200,200,200);
//c.fillStyle = "blue";

// ordering is important with regard to fill styles and color
//c.fillRect(550,200,200,200);
//c.fillRect(720,300,200,200);
//console.log(canvas);

//Line

//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,100);
//c.lineTo(500,300);
//c.strokeStyle = "blue";
//c.stroke();

//arc / circle
//beginPath states a new path and disconnects from the previous path in order
//stroke style has to go before stroke property

//c.beginPath();
//c.arc(300, 300, 30, 0, Math.PI * 2, false);
//c.strokeStyle = "green";
//c.stroke();

//for (var i = 0; i < 7; i ++) {
//    var x = Math.random() * window.innerWidth;
//    var y = Math.random() * window.innerHeight;
//    var color = ["red", "blue", "green"];
//    var randomColor = color[Math.floor(Math.random()*color.length)];
//    c.beginPath();
//    c.arc(x, y, 30, 0, Math.PI * 2, false);
//    c.strokeStyle = randomColor;
//    c.stroke();
//}

var mouse = {
    x: undefined,
    y: undefined
    
}

var maxRadius = 40;
var minRadius = 5;

var colorArray = [
    '#F9E4AD',
    '#E6B098',
    '#CC4452',
    '#723147',
    '#31152B',    
];


window.addEventListener('mousemove', 
    function(event) {
    //console.log(mouse);
    mouse.x = event.x;
    mouse.y = event.y;
    
});

window.addEventListener('resize', function() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    
    init();
});



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {
        //console.log('circle');

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){ 
        //if the x cordinate of the cirlce plus it's radius becomes greater than innerwidth "of the canvas" which is the innerwidth of the window then reverse it's "velocity" and it's origin being 0 coordinate where as innerwidth is the "max" value of the window
        
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
        }
    
        // increment x and y by the value/variable dx and or dy by it's set value every frame
        this.x += this.dx;
        this.y += this.dy;
        
        //interactivity 
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            
            if (this.radius < maxRadius){
                this.radius +=1;
            }
            
        } else if (this.radius > this.minRadius) {
            
            this.radius -= 1;
        }
        
        //draw
        
        this.draw();
    
    }
}


var circleArray = [];


function init() {
    
    circleArray = [];
    
    for (var i = 0; i < 1200; i++){
    
        //var circle = new Circle (200, 200, 3, 3, 30);
    
        var radius = Math.random() * 3 + 1;
    
        //coordinate
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        // velocity
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    
    }
}



function animate() {
    requestAnimationFrame(animate);
    //console.log('power');
    
    //clear canvas
    c.clearRect(0,0,innerWidth,innerHeight);
    
    //circle.update();
    
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();
