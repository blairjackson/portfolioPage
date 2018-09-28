var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var friction = 0.7;
var gravity = 0.2;


var colour_list = [
    "#04E762",
    "#F5B700",
    "#DC0073",
    "#008BF8",
    "#89FC00"
];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: dx,
        y: dy
    }
    this.radius = radius;
    this.colour =  colour_list[Math.floor(Math.random() * 5)];
}


Circle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colour;
    c.fill();
}

Circle.prototype.move = function () {

    this.draw();

    if (this.y + this.radius + this.velocity.y >= innerHeight) {
        this.velocity.y = -this.velocity.y;
        this.velocity.y *= friction;
        this.shatter();
    } else {
        this.velocity.y += gravity;
    }

    if (this.x + this.radius + this.velocity.x >= innerWidth || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x;
    }


    this.y += this.velocity.y;
    this.x += this.velocity.x;


}

Circle.prototype.shatter = function () {
    this.radius -= 3;
    for (var i = 0; i < 8; ++i) {
        miniCircleList.push(new miniCircle(this.x, this.y));
    }
}

function miniCircle(x, y) {
    Circle.call(this, x, y);

    this.radius = 5;
    this.velocity = {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 80
    }

    this.friction = 0.8;
    this.gravity = 0.5;
    this.ttl = 100;
    this.opacity = 1;
}

miniCircle.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    c.shadowColor = "white";
    c.shadowBlur = 20;
    //c.strokeStyle = "black";
    c.fill();
    //c.stroke();
}

miniCircle.prototype.move = function () {

    this.draw();

    console.log(this.radius);
    if (this.y + this.radius + this.velocity.y >= innerHeight) {
        this.velocity.y = -this.velocity.y;
        this.velocity.y *= this.friction;
    } else {
        this.velocity.y += this.gravity;
    }

    if (this.x + this.radius + this.velocity.x >= innerWidth || this.x - this.radius <= 0) {
        this.velocity.x = -this.velocity.x;
    }


    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;


}

let miniCircleList;
let circleList;
let timer = 0;

function init() {
    miniCircleList = [];
    circleList = [];

    // for (var i = 0; i < 10; i++) {
    //     var radius = (Math.random() + 1) * 20;
    //     var x = Math.random() * (innerWidth - radius * 2) + radius;
    //     var y = 0 - (radius * 2);
    //     var dx = (Math.random() - 0.5) * 6;
    //     var dy = (Math.random() - 0.5) * 6;
    //     circleList.push(new Circle(x, y, dx, dy, radius));
    // }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < circleList.length; ++i) {
        circleList[i].move();
        if(circleList[i].radius <= 0){
            circleList.splice(i, 1);
        }
    }

    for (var i = 0; i < miniCircleList.length; ++i) {
        miniCircleList[i].move();
        if (miniCircleList[i].ttl <= 0) {
            miniCircleList.splice(i, 1);
        }
    }
    timer++;

    if(timer % 75 == 0){
        var radius = (Math.random() + 1) * 20;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = 0 - (radius * 2);
        var dx = (Math.random() - 0.5) * 6;
        var dy = (Math.random() - 0.5) * 6;
        circleList.push(new Circle(x, y, dx, dy, radius));
    }
}

init();
animate();