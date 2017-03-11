var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
//ctx.closePath();

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            document.write('left');
            break;
        case 38:
            document.write('up');
            break;
        case 39:
            document.write('right');
            break;
        case 40:
            document.write('down');
            break;
    }
};