function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype =
{
    add: function (point) {
        this.x += point.x;
        this.y += point.y;
    },

    subtract: function (point) {
        this.x -= point.x;
        this.y -= point.y;
    },

    scale: function (multiplier) {
        this.x *= multiplier;
        this.y *= multiplier;
    },

    min: function (x, y) {
        if (this.x < x)
            this.x = x;
        if (this.y < y)
            this.y = y;

    },

    max: function (x, y) {
        if (this.x > x)
            this.x = x;
        if (this.y > y)
            this.y = y;
    },

    copy: function (point) {
        this.x = point.x;
        this.y = point.y;
    },

    init: function () {
        this.x = this.y = 0;
    }
}