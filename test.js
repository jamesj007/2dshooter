var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//ctx.beginPath();
/*
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
//ctx.closePath();
*/

//createPlayer();
var players = [];
var colors= ["#CB4335", "#884EA0", "#2471A3", "#28B463", "#CA6F1E"];

function Player() {
    //var currentThis = this;
    this.x = Math.round(Math.random()*800),
    this.y = Math.round(Math.random()*800),
    this.radius = 20
    this.color = colors[Math.floor(Math.random()*colors.length)];
    //var currentX = x

    while ((this.x - 20) <= 0){
        this.x = Math.round(Math.random()*800);
    }

    while ((this.y - 20) <= 0){
        this.y = Math.round(Math.random()*800);
    }

    this.weapon = new createWeapon(this.x,this.y,this.color);

    this.draw = function(ctx) {
        this.weapon.updateWeapon(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        //alert(x);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        //ctx.moveTo(110, 75);
        ctx.fill();
        ctx.closePath();
        this.weapon.drawWeapon(ctx);
    }
    //alert(x);
    this.getX = function(){
        //alert("it comes here");
        //alert(x);
        return this.x;
    }

    this.setX = function(someX){
         this.x = someX;
    }
};

function createWeapon(x, y, color){
    this.x = x;
    this.y = y;
    this.drawWeapon = function(ctx){
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.rect(this.x+10, this.y-10, 50, 20);
        ctx.fill();
        ctx.closePath();
    }

    this.updateWeapon = function(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}


function createPlayer(){
    var newPlayer = new Player();
    //alert("it getshere");
    newPlayer.draw(ctx);
    players.push(newPlayer);
    
    //alert(players.length);
    //alert(newPlayer.getX)
    //alert(players[0].getX());
}

//console.log(players.length);


window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 87) { //up key
        //alert('up');
        //alert(players[0].radius);
        players[0].setX(players[0].getX() - 10);
        //alert("it gets here");
        //players[0].draw(ctx);
        //alert("it gets here x2");
    } else if (code === 83) { //down key
        //alert('down');
    } else if (code === 65) { //left key
        //alert('down');
    } else if (code === 68) { //right key
        //alert('down');
    } 
    reDraw();
};

function reDraw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < players.length; i++){
        players[i].draw(ctx);
    }
}