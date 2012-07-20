(function () {

    var canvas, context, rope, width, height, trail;

    var domReady = function () {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;

        rope = Rope(canvas);

        $("#wind").click(function () {
            rope.toggleWind();
        });
        $("#trail").click(function () {
            toggleTrail();
        });


        context.fillStyle = "rgba(0,0,0,1.0)";
        context.fillRect(0, 0, width, height);
    };

    var toggleTrail = function () {
        trail = !trail;
    };

    var loop = function () {
        requestAnimationFrame(loop);
        if (!trail) {
            context.fillStyle = "rgba(0,0,0,1.0)";
            context.fillRect(0, 0, width, height);
        }
        rope.onTick();
    };

    $(document).ready(function () {
        domReady();
        loop();
    });

} ());

