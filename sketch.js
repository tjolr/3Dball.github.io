var ball;
var planeMain;
var boxes = [];
var spawnYCoordinate = -2000;
var speedY = 25;
var planeUpdateCount = 1;
var pathWidth = 1200;
var halfPathWidth = pathWidth / 2;
var camY = 0;
let txt;
var canvas;
var scoreInSeconds = 0;
let theta = 0;
var newBoxPropability = 0.25;

function preload() {
    bgImg = loadImage('space2.jpg');
    boxFillImg = loadImage('box5.jpg');
    ballFillImg = loadImage('sun.jpg');
    planeFillImg = loadImage('plane3.jpg');
    wallFillImg = loadImage('wall2.jpg');
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);

    txt = createGraphics(200, 200);
    txt.textSize(30);

    ball = new Ball();
    planeMain = new Plane();
}

//Runs 60 FPS
function draw() {
    canvas.background(0);

    //Counter & scores
    frameCount % 60 == 0 && scoreInSeconds++;
    frameCount % 120 == 0 && speedY++;
    if (newBoxPropability > 0 && frameCount % 180 == 0){
        newBoxPropability -= 0.01;
        console.log("New Box Prop: "+newBoxPropability);
    }

    //Adding walls on both sides of the platform
    push();
    translate(-halfPathWidth-50, spawnYCoordinate, 0);
    texture(wallFillImg);
    box(100, 9300, 120);
    pop();
    push();
    translate(halfPathWidth+50, spawnYCoordinate, 0);
    texture(wallFillImg);
    box(100, 9300, 120);
    pop();

    //New plane with backgroundImage.
    push();
    translate(0, -2100, 370);
    rotateX(1.8 + mouseY / 1500);
    rotateZ(PI - ball.x / 1500);
    rotateY(PI);
    texture(bgImg);
    plane(window.innerWidth * 9, window.innerHeight * 9);
    pop();

    //ScoreText.
    push();
    translate(0, -2000, 700);
    rotateX(1.8);
    rotateZ(PI);
    rotateY(PI);
    txt.clear();
    txt.background(210, 0);
    txt.text('SCORE: ' + scoreInSeconds, 20, 110);
    texture(txt);
    plane(3200, 2000);
    pop();

    //Preventing camY offscreen.
    mouseY < 75 ? camY = 75 : camY = mouseY;

    //Moving camera relative to mouse Y coordinate.
    camera(ball.x / 3, 1700, camY, 0, 0, 0, 0, 1, 0);

    //Adding plane and updating ball.
    push()
    texture(planeFillImg);
    planeMain.show();
    pop();

    push();
    ball.update();
    texture(ballFillImg);
    ball.show();
    pop();


    for (j = 0; j < boxes.length; j++) {
        push();
        boxes[j].update();
        texture(boxFillImg);
        boxes[j].show();
        pop();

        //Checking if ball has collided with the boxes.
        if(((ball.x + ball.radius) >= (boxes[j].x - boxes[j].boxHalfW)) && ((ball.x - ball.radius) <= (boxes[j].x + boxes[j].boxHalfW))){
            if((ball.y - ball.radius) <= boxes[j].y && (ball.y + ball.radius) >= boxes[j].y){
                noLoop();
            }
        }

        if (boxes[j].y > 2000) {
            boxes.splice(j, 1);
        }
    }



    if (frameCount % 25 == 0 && Math.random() > newBoxPropability) {
        var boxWidth = 150 + (Math.random() * 300);
        boxes.push(new Box(boxWidth));
    }

    theta += 0.05;


}

function keyPressed() {
    if (key === 's') {
        noLoop();
    }
    if (key === 'd') {
        loop();
    }
}
