<!DOCTYPE html>
<html lang='en' class=''>
<head>



<style class="styles">

body{
  background: #F6F7BD;
}

h1{
  color: #BF4D28;
  font-size: 3em;
  line-height:1em;
  margin-bottom: 15px;
  font-family: sans-serif;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.4);
  @media{
    
  }
}

p{
  line-height: 1em;
}

div{
  color: #BF4D28;
  font-family: sans-serif;
  line-height:10px;
  margin:2%;
}

#canvas{
    margin-left:10%;
   background-image: url("C:/Users/Dad/Pictures/fire.png");
    background-repeat: no-repeat;
    background-size: 1200px 900px; 
}</style>
</head>
<body>
<div><p>
  Use the arrow keys and your platforming skills to reach the blue diamond</p></div>
<canvas id="canvas">
  
 
  </canvas>


<script >


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();



var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 1200,
height = 900,
player = {
    x: width / 2,
    y: 200,
    width: 25,
    height: 25,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: false,
    color: 'purple'
	},

keys = [],
friction = 0.8,
gravity = 0.4,
boxes = [],
powerup = [];

powerup.push({
    x: 810,
    y: 750,
    width: 20,
    height: 20,
    color: 'green',
    effect: 'shrink' });

powerup.push({
    x: 400,
    y: 150,
    width: 20,
    height: 20,
    color: 'orange',
    effect: 'gravity' });

powerup.push({
    x: -15,
    y: 88,
    width: 20,
    height: 20,
    color: '#222',
    effect: 'tele',
    rotate: 20,
    px: 20, //where they get teleported
    py: 370,
    stay: true });

powerup.push({
    x: 60,
    y: 365,
    width: 20,
    height: 20,
    color: '#2A5D77',
    effect: 'win',
    stay: true });
	
powerup.push({
    x: 5,
    y: 810,
    width: 1200,
    height: 80,
    color: 'darkred',
    effect: 'lava',
    stay: true });


// dimensions
boxes.push({ //box on left
    x: 0,
    y: height / 4 + 10,
    width: 10,
    height: height,
    color: 'green' });

boxes.push({ //box on left
    x: 0,
    y: 0,
    width: 10,
    height: height / 4 - 15,
    color: 'green' });

boxes.push({ //box for the ground
    x: 0,
    y: height - 10,
    width: width,
    height: 50,
    color: 'orange' });

boxes.push({ //box on right
    x: width - 10,
    y: 0,
    width: 50,
    height: height,
    color: 'yellow' });

boxes.push({
    x: 290,
    y: 200,
    width: 260,
    height: 10,
    color: 'blue' });

boxes.push({
    x: 590,
    y: 200,
    width: 80,
    height: 10,
    color: 'blue' });

boxes.push({
    x: 120,
    y: 250,
    width: 150,
    height: 10,
    color: 'red' });

boxes.push({
    x: 220,
    y: 300,
    width: 80,
    height: 10,
    color: 'black' });

boxes.push({
    x: 340,
    y: 350,
    width: 90,
    height: 10,
    color: '#655643' });

boxes.push({
    x: 740,
    y: 300,
    width: 160,
    height: 10,
    color: '#655643' });

boxes.push({
    x: 0,
    y: 350,
    width: 90,
    height: 10,
    color: '#655643' });

boxes.push({
    x: 90,
    y: 350,
    width: 10,
    height: 50,
    color: '#655643' });
	
boxes.push({
    x: 10,
    y: 390,
    width: 90,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 300,
    y: 800,
    width: 600,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 950,
    y: 800,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1000,
    y: 750,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1050,
    y: 700,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1100,
    y: 650,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1150,
    y: 600,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1100,
    y: 550,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1050,
    y: 500,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 1000,
    y: 450,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 950,
    y: 400,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 900,
    y: 350,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 20,
    y: 750,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 140,
    y: 780,
    width: 40,
    height: 10,
    color: '#655643' });
	
boxes.push({
    x: 90,
    y: 680,
    width: 40,
    height: 10,
    color: '#655643' });
	
	


canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 1; //how high to jump
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }



    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {//print boxes
        ctx.fillStyle = boxes[i].color;
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }

    if (player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    ctx.fill(); //Draw charater stuff
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //draw powerup stuff 
    for (var j = 0; j < powerup.length; j++) {
        ctx.save();
        var cx = powerup[j].x + 0.5 * powerup[j].width, // x of shape center
        cy = powerup[j].y + 0.5 * powerup[j].height; //y of shape center
        ctx.translate(cx, cy); //translate to center of shape
       if (powerup[j].effect === 'tele') {
            
        }
        ctx.translate(-cx, -cy); //translate center back to 0,0
        ctx.fillStyle = powerup[j].color;
        ctx.fillRect(powerup[j].x, powerup[j].y, powerup[j].width, powerup[j].height);
        ctx.restore();

        //powerup collision
        if (colCheck(player, powerup[j]) !== null) {//touched power up!
            if (powerup[j].effect === 'gravity') {
                gravity = 0.4; //decrease gravity
                player.speed = 4;
                player.color = 'white';
            } else
            if (powerup[j].effect === 'shrink') {
                player.width = 10;
                player.height = 10;
                player.speed = 5;
            } else
            if (powerup[j].effect === 'tele') {
                player.x = powerup[j].px;
                player.y = powerup[j].py;
            } else
            if (powerup[j].effect === 'win') {
                var r = confirm("You win! Play again?");
                if (r == false) {
                    player.x = 200;
                    player.y = 200;
                } else {
                    window.location.href = window.location.href;
                }
            }
			if (powerup[j].effect === 'lava') {
                var r = confirm("You fell in the lava! Play again?");
                if (r == false) {
                    player.x = 200;
                    player.y = 200;
                } else {
                    window.location.href = window.location.href;
                }
            }
            if (powerup[j].stay !== true)
            powerup[j].width = 0; //make power up go away
        }
    }
    //powerup stuff

    requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = shapeA.x + shapeA.width / 2 - (shapeB.x + shapeB.width / 2),
    vY = shapeA.y + shapeA.height / 2 - (shapeB.y + shapeB.height / 2),
    // add the half widths and half heights of the objects
    hWidths = shapeA.width / 2 + shapeB.width / 2,
    hHeights = shapeA.height / 2 + shapeB.height / 2,
    colDir = null;

    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});

</script>
</body>
</html>