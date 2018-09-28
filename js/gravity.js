var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//random colour choices for the balls
colourList = [
    "#6CD4FF",
    "#FF8360",
    "#E8E288",
    "#7DCE82",
    "#00FFF5"
];

var friction = 0.95;
var gravity = 0.2;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.colour = colourList[Math.floor(Math.random()*5)];
    this.outline = colourList[Math.floor(Math.random() * 5)];


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
        c.strokeStyle = this.outline;
        c.stroke();
    }

    this.move = function () {

        if (this.y + this.radius + this.dy >= innerHeight) {
            this.dy = -this.dy;
            this.dy *= friction;
            this.dx *= friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }

}

var circleList = [];

function init() {
    circleList = [];
    for (var i = 0; i < 100; ++i) {

        var radius = (Math.random() * 10) * 5;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 12;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 12;

        circleList.push(new Circle(x, y, dx, dy, radius));

    }
}

//animate by updating continuously 
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleList.length; ++i) {
        circleList[i].move();
    }
}

init();
animate();






