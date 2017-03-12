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
var targetX = -1;
var targetY = -1;
//var newTarget = false;


function Player() {
    //var currentThis = this;
    this.x = Math.round(Math.random()*800),
    this.y = Math.round(Math.random()*800),
    this.radius = 20
    this.color = colors[Math.floor(Math.random()*colors.length)];
    this.playerVel = 5;
    this.playerAcl = 0;
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

    this.getY = function(){
        return this.y;
    }

    this.setY = function(someY){
        this.y = someY;
    }

    this.movePosX = function(){
        this.x = this.x + (.1)*this.playerVel + .5*(.01)*this.playerAcl;
    }

    this.movePosY = function(){
        this.y = this.y + (.1)*this.playerVel + .5*(.01)*this.playerAcl;
    }

    this.moveNegX = function(){
        this.x = this.x - (.1)*this.playerVel - .5*(.01)*this.playerAcl;
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


function reDraw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < players.length; i++){
        players[i].draw(ctx);
    }
}

/*
var gameStart = true;

while (gameStart){

}
*/

function setTarget(e){
    //movePlayer(false);
    var rectBounds = canvas.getBoundingClientRect();
    targetX = e.clientX - rectBounds.left;
    targetY = e.clientY - rectBounds.top;
    if (players.length > 0){
        var deCell = .07;
        var xDistance = targetX - players[0].getX();
        var yDistance = targetY - players[0].getY();
        var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        if (distance > 1) {
            players[0].setX(players[0].getX() + xDistance*deCell);
            //ship.y += yDistance * easingAmount;
            players[0].setY(players[0].getY() + yDistance*deCell);
        }
        reDraw();
        //moveRemainder();
    }
    coor = "Coordinates: (" + targetX + "," + targetY + ")";
    document.getElementById("demo").innerHTML = coor;
    //reDraw();
}
/*
//make a runnable functions
function movePlayer(){
    if (players.length > 0){
        //while (players[0].getX() !== targetX){//} && players[0].getY() !== targetY){
        if (players[0].getX() !== targetX && players[0].getY() !== targetY){
            //while (players[0].getX() !== xMouse && players[0].getY() !== yMouse){
            if (players[0].getX() < targetX && players[0].getY() < targetY){
              
                //players[0].setX(players[0].getX() + 10);
                players[0].movePosX();
                players[0].movePosY();
                //players[0].setY(players[0].getY() + 10);
                //alert("came here1");
                
                //alert("came here1");
            } else if (players[0].getX() > targetX && players[0].getY() > targetY){
                
                //players[0].setX(players[0].getX() - 10);
                players[0].moveX();
                //players[0].setY(players[0].getY() - 10);
               
                
            } else if (players[0].getX() > targetX && players[0].getY() < targetY){
                
                //players[0].setX(players[0].getX() - 10);
                players[0].moveX();
                //players[0].setY(players[0].getY() + 10);
                
                
            } else if (players[0].getX() < targetX && players[0].getY() > targetY){
            
                //players[0].setX(players[0].getX() + 10);
                players[0].moveX();
                //players[0].setY(players[0].getY() - 10);
               
            }
            
            
        } else if (players[0].getX() !== targetX){

        } else if (players[0].getY() != targetY){

        }
       // alert("stuck here");
        reDraw();    
        //}
    }
}
*/

function moveRemainder(){
   //alert("it comes here");
    if (targetX !== -1 && targetY !== -1){
        if (players.length > 0){
            //alert(targetY);
            var deCell = .03;
            var xDistance = targetX - players[0].getX();
            var yDistance = targetY - players[0].getY();
            var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            if (distance > 1) {
                players[0].setX(players[0].getX() + xDistance*deCell);
            //ship.y += yDistance * easingAmount;
                players[0].setY(players[0].getY() + yDistance*deCell);
            }
            reDraw();
            /*
            if (players[0].getX() !== targetX && players[0].getY() !== targetY){
                moveRemainder();
            }
            */
                   
        }
    }
}


var timeout;
document.onmousemove = function(){
  clearTimeout(timeout);
  timeout = setTimeout(function(){
          moveRemainder();
    }, 1000);
}


