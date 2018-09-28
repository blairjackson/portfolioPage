var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 60;

//random colour choices for the balls
colourList = [
    "#6CD4FF",
    "#FF8360",
    "#E8E288",
    "#7DCE82",
    "#00FFF5"
];

//get the mouse coordinates
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

//reload page when page is resized
window.addEventListener('resize', function () {
    anvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})


//Circle class 
function Circle(x, y, dx, dy, radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colourList[Math.floor(Math.random() * 5)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = "black";
        c.fillStyle = this.color;
        c.fill();
        //c.stroke();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

}


//list of all circles that are generated
var circles = [];

function init() {

    circles = [];
    for (var i = 0; i < 400; ++i) {

        var radius = Math.random() * 3 + 3;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 6;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 6;

        circles.push(new Circle(x, y, dx, dy, radius));
    }
}

//animate by updating continuously 
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circles.length; ++i) {
        circles[i].update();
    }
}


init();
animate();