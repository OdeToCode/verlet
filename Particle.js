var Particle = function (x, y, canvas) {
    this.currentPoint = new Point(x, y);
    this.lastPoint = new Point(x, y);
    this.forcePoint = new Point(0, 0);
    this.tempPoint = new Point(0, 0);
    this.calcPoint = new Point(0, 0);
    this.canvas = canvas;
    this.constraints = [];
    this.center = canvas.width / 2;
    this.width = 30;
    this.height = 30;
}

Particle.prototype =
{
    x: function () {
        return this.currentPoint.x;
    },

    y: function () {
        return this.currentPoint.y;
    },

    update: function () {
        ctx.fillRect(this.x(), this.y(), 0, this.width, this.height);
    },

    verlet: function (timeStep) {
        this.tempPoint.copy(this.currentPoint);
        this.calcPoint.init();
        this.calcPoint.add(this.currentPoint);
        this.calcPoint.subtract(this.lastPoint);
        this.forcePoint.scale(timeStep * timeStep);
        this.calcPoint.add(this.forcePoint);
        this.currentPoint.add(this.calcPoint)
        this.lastPoint.copy(this.tempPoint);
    },

    satisfyConstraints: function () 
    {
        for (var i = 0; i < this.constraints.length; i++) {
            var dx = this.currentPoint.x - this.constraints[i].element.left();
            var dy = this.currentPoint.y - this.constraints[i].element.top();
            var d1 = Math.sqrt((dx * dx) + (dy * dy));
            var d2 = 0;
            if (d1 != 0) {
                d2 = 0.5 * (d1 - this.constraints[i].distance) / d1;
            }
            dx = dx * d2;
            dy = dy * d2;
            this.currentPoint.x -= dx;
            this.currentPoint.y -= dy;
            if (this.constraints[i].element.currentPoint != null) {
                this.constraints[i].element.currentPoint.x += dx;
                this.constraints[i].element.currentPoint.y += dy;
            }
            else {
                this.currentPoint.x -= dx;
                this.currentPoint.y -= dy;
            }
        }
    }
};