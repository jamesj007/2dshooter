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
//var angle = 0;
/*function Bullet() {
    this.originX = 0;
    this.originY = 0;
    this.facingDir = 0;
    this.Bulletradius = 5;
    this.drawBullet = function(ctx){
        if(this.originX>0 && this.originX<canvas.width && this.originY>0 && this.originY < canvas.height){
            
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.originX, this.originY, this.Bulletradius, 0, Math.PI*2);
            ctx.fill();
            ctx.closePath();
            this.originX += 5*Math.cos(this.facingDir);
            this.originY += 5*Math.sin(this.facingDir);
        }
    }
   this.setFacingDir = function(someDir) {
       this.facingDir=someDir;
   }
   this.setOriginX = function(newOriginX){
       this.originX = newOriginX;
   }
   this.setOriginY = function(newOriginY){
       this.originY = newOriginY;
   }

}
*/
var targetX = -1;
var targetY = -1;

function Bullet(someX, someY, someAng, someColor){
    this.originX = someX;
    this.originY = someY;
    this.facingDir = someAng;
    this.bulletRadius = 5;
    this.bulletVel = 5;

    this.angle = 0;
    console.log(this.facingDir);
    if (targetX === -1 || targetY === -1){
        this.angle = 0;
    } else {
        var boxCenter=[this.originX, this.originY];
        this.angle = Math.atan2(targetX - boxCenter[0],- (targetY - boxCenter[1]) )*(180/Math.PI)+90;
    }


    this.draw = function(){
        
        ctx.beginPath();
        ctx.fillStyle = "#000000";//someColor;
        //alert(x);
        ctx.arc(this.originX, this.originY, this.bulletRadius, 0, Math.PI*2);
        //ctx.moveTo(110, 75);
        ctx.fill();
        ctx.closePath();
    } 

    this.update = function(){
       
        this.originX += 5*Math.cos(this.angle * (Math.PI/180) + Math.PI);
        this.originY += 5*Math.sin(this.angle * (Math.PI/180) + Math.PI);
        if (this.originX >= canvas.width || this.originX <= 0 || this.originY >= canvas.height 
        || this.originY <= 0){
            //do something
        }
        this.draw();
    }
    
}


function Player() {
    //var currentThis = this;
    this.x = Math.round(Math.random()*800)
    this.y = Math.round(Math.random()*800)
    this.radius = 20
    this.color = colors[Math.floor(Math.random()*colors.length)];
    //var currentX = x
    this.facingDirection = 0;
    this.bullets = [];

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
        this.weapon.drawWeapon(ctx,this.facingDirection);
        
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

    this.setFacingDirection = function(someDir){
        this.facingDirection = someDir;
    }

    this.getFacingDirection = function(){
        return this.facingDirection;
    }

    this.shoot = function(){

        var newBullet = new Bullet(this.x, this.y, this.facingDirection, this.color);
        this.bullets.push(newBullet);
        newBullet.draw();
    }
};

function createWeapon(x, y, color){
    this.x = x;
    this.y = y;
    this.drawWeapon = function(ctx,newAngle){
        
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(newAngle*Math.PI/180);
        ctx.rect(10,-10, 50, 20);
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }

    this.updateWeapon = function(newX, newY){
        this.x = newX;
        this.y = newY;
    }

    this.getWeaponX = function(){
        return this.x;
    }

    this.getWeaponY = function(){
        return this.y;
    }
}

function rotateWeapon(event){
    var rectBounds = canvas.getBoundingClientRect();
    targetX = event.clientX - rectBounds.left;
    targetY = event.clientY - rectBounds.top;
    
    if (players.length > 0){
        var boxCenter=[players[0].weapon.getWeaponX(),players[0].weapon.getWeaponY()];
        var angle = Math.atan2(targetX - boxCenter[0],- (targetY - boxCenter[1]) )*(180/Math.PI)-90;
        players[0].setFacingDirection(angle);
        players[0].weapon.drawWeapon(ctx,angle);
        reDraw();
    }
}

function createPlayer(){
    var newPlayer = new Player();
    //alert("it getshere");
    
    players.push(newPlayer);
    reDraw();
    //alert(players.length);
    //alert(newPlayer.getX)
    //alert(players[0].getX());
}

/*function createBullet(){
    var newBullet = new Bullet();
    bullets.push(newBullet);
    newBullet.setFacingDir(players[0].getFacingDirection());
    newBullet.setOriginX(players[0].getX());
    newBullet.setOriginY(players[0].getY());
    reDraw();
}
*/
//console.log(players.length);


window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 32) {
//createBullet();
        players[0].shoot();
    }
    //reDraw();
};

function reDraw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < players.length; i++){
        for (var j = 0; j < players[i].bullets.length; j++){
            players[i].bullets[j].update();
        }
        players[i].draw(ctx);
    }
}

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