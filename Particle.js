function Particle(canvas, left, top) {
    
    var currentPoint = new Point(left, top);
    var lastPoint = new Point(left, top);
    var forcePoint = new Point(0, 0);    

    var constraints = [];
    var context = canvas.getContext("2d");    

    var getX = function () {
        return currentPoint.x;
    };

    var getY = function () {
        return currentPoint.y;
    };

    var update = function () {
        var ballSize = 30;
        var gradient = context.createRadialGradient(currentPoint.x + ballSize / 2,
                                                    currentPoint.y + ballSize / 2,
                                                    2,
                                                    currentPoint.x + ballSize / 2,
                                                    currentPoint.y + ballSize / 2,
                                                    ballSize * 0.20);
        gradient.addColorStop(0, "rgba(204,0,0,1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(currentPoint.x, currentPoint.y, ballSize, ballSize);
    };

    var verlet = function (timeStep) {
        
        var calcPoint = new Point(0, 0);
        var tempPoint = new Point(0, 0);    

        tempPoint.copy(currentPoint);        
        calcPoint.add(currentPoint);
        calcPoint.subtract(lastPoint);
        forcePoint.scale(timeStep * timeStep);
        calcPoint.add(forcePoint);
        currentPoint.add(calcPoint)

        lastPoint.copy(tempPoint);
    };

    var addConstraint = function (constraint) {
        constraints.push(constraint);
    };

    var applyForce = function (force) {
        forcePoint = force;
    };

    var applyDelta = function (dpoint) {
        currentPoint.add(dpoint);
    };

    var satisfyConstraints = function () {
        for (var i = 0; i < constraints.length; i++) {
            var dx = currentPoint.x - constraints[i].element.getX();
            var dy = currentPoint.y - constraints[i].element.getY();
            var d1 = Math.sqrt((dx * dx) + (dy * dy));
            var d2 = 0
            if (d1 != 0) {
                d2 = 0.5 * (d1 - constraints[i].distance) / d1;
            }
            var dpoint = new Point(dx * d2, dy * d2);
            currentPoint.subtract(dpoint);
            if (constraints[i].element.applyDelta) {
                constraints[i].element.applyDelta(dpoint);
            }
            else {
                currentPoint.subtract(dpoint);
            }
        }
    };

    return {
        getX: getX,
        getY: getY,
        update: update,
        verlet: verlet,
        addConstraint: addConstraint,
        applyForce: applyForce,
        satisfyConstraints: satisfyConstraints,
        applyDelta: applyDelta
    };
}
