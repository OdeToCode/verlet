var Point = function (x, y) {    
    if (x < this.minX) x = this.minX;
    if (x > this.maxX) x = this.maxX;
    if (y < this.minY) y = this.minY;
    if (y > this.maxY) y = this.maxY;

    this.x = x;
    this.y = y;
};

Point.prototype = {

    add: function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    },

    subtract: function (point) {
        return new Point(this.x - point.x, this.y - point.y);
    },

    scale: function (multiplier) {
        return new Point(this.x * multiplier, this.y * mulitplier);
    },

    minX: 0,
    maxX: 300,
    minY: 0,
    maxY: 300
};