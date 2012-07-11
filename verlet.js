(function () {

    var ballSize = 20;
    var canvas, context, width, height, point;

    var domReady = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");


        Point.maxX = width = canvas.width;
        Point.maxY = height = canvas.height;
        point = new Point(width / 2, height / 2);
    };

    var draw = function () {
        context.fillStyle = "rgba(0,0,0,1.0)";
        context.fillRect(0, 0, width, height);

        var gradient = context.createRadialGradient(point.x + ballSize / 2,
                                                    point.y + ballSize / 2,
                                                    0,
                                                    point.x + ballSize / 2,
                                                    point.y + ballSize / 2,
                                                    ballSize * 0.66);
        gradient.addColorStop(0, "rgba(254,254,199,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(point.x, point.y, ballSize, ballSize);
    };

    var loop = function () {
        requestAnimationFrame(loop);                
        point = new Point(point.x + Math.random() - 0.5,
                          point.y + Math.random() - 0.5);
        draw();
    };

    $(document).ready(function () {
        domReady();
        loop();
    });

} ());