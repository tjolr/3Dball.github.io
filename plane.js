function Plane(){
    this.y = spawnYCoordinate;

    this.show = function(){
        push();
        translate(0, this.y,0);
        plane(pathWidth,9302);
        pop();
    }

}
