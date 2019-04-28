function Ball() {
    this.x = 0;
    this.y = 700;
    this.z = 0;
    this.radius = 35;
    this.ballSpeed = 0;

    this.show = function() {
        push();
        translate(this.x, this.y, 70);
        rotateX(-this.ballSpeed);
        sphere(this.radius * 2);
        pop();
    }

    this.update = function() {
        this.x = mouseX - (window.innerWidth / 2);

        if (this.x >= halfPathWidth - this.radius) {
            this.x = halfPathWidth - this.radius;
        } else if (this.x < -halfPathWidth + this.radius) {
            this.x = -halfPathWidth + this.radius;
        }

        this.ballSpeed += 25;

    }
}
