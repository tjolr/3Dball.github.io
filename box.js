function Box(boxWidth) {
    this.boxWidth = boxWidth;
    this.boxHeight = 130;
    this.boxDepth = 200;
    this.boxHalfW = this.boxWidth/2;

    this.x = this.boxWidth/2 + (Math.random()*(pathWidth - this.boxWidth*1)) - halfPathWidth;
    this.y = spawnYCoordinate;
    this.z = 0;

    this.show = function() {
        push();
        translate(this.x, this.y, this.boxHeight/2);
        box(this.boxWidth, this.boxDepth, this.boxHeight);
        pop();
    }

    this.update = function() {
        this.y += speedY;
    }
}
