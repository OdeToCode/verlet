(function () {

    var canvas, context, rope, width, height;

    var domReady = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;

        rope = Rope(canvas);

        $("#wind").click(function () {
            rope.toggleWind();
        });
    };

    var loop = function () {
        requestAnimationFrame(loop);
        context.fillStyle = "rgba(0,0,0,1.0)";
        context.fillRect(0, 0, width, height);
        rope.onTick();
    };

    $(document).ready(function () {
        domReady();
        loop();
    });

} ());

