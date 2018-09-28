
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function Star(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = "rgb(227, 236, 249)";
}


Star.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colour;
    c.shadowBlur = 20;
    c.shadowColor = this.colour;
    c.fill();
}

let moon = new Star(200, 200, 40);
let stars = [];

    for (var i = 0; i < 500; ++i) {
        var radius = Math.random() * 1.5;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;

        stars.push(new Star(x, y, radius));
    }


// var img = new Image();
// img.onload = function () {
//     c.drawImage(img, 10, 10);
// }
// img.src = "images/pyramids.svg";

moon.draw();


for(var i = 0; i< stars.length; ++i){
    stars[i].draw();
}
