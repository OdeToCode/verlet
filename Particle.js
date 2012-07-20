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
        if (currentPoint.x < 2) currentPoint.x = 2;
        if (currentPoint.x > canvas.width  -20) currentPoint.x = canvas.width - 20;
        if (currentPoint.y < 2) currentPoint.y = 2;
        if (currentPoint.y > canvas.height - 2) currentPoint.y = canvas.height - 2;
    };

    return {
        getX: getX,
        getY: getY,
        verlet: verlet,
        addConstraint: addConstraint,
        applyForce: applyForce,
        satisfyConstraints: satisfyConstraints,
        applyDelta: applyDelta
    };
}
