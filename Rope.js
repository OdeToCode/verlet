var Rope = function (canvas) {

    var canvas = canvas;
    var particles = [];
    var offset = canvas.width / 2;
    var gravityVector = new Point(0, 0.9);
    var timeStep = 0.6;
    var wind = false;
    var windVector = new Point(0, 0);
    var startElement = {
        getX: function () { return offset; },
        getY: function () { return 2; }
    };

    var onTick = function () {
        accumulateForces();
        verlet();
        satisfyConstraints();
        updateAll();
    };

    var toggleWind = function () {
        wind = !wind
        if (wind) {
            windVector.x = 1.2;
            windVector.y = 0;
        } else {
            windVector.x = 0;
            windVector.y = 0;
        }
    };

    var accumulateForces = function () {
        
        for (var i = 0; i < particles.length; i++) {
            var forcePoint = new Point(0, 0);
            forcePoint.add(gravityVector);
            forcePoint.add(windVector);                
            particles[i].applyForce(forcePoint);
        }        
    };

    var verlet = function () {
        for (var i = 0; i < particles.length; i++) {
            particles[i].verlet(timeStep);
        }
    };

    var satisfyConstraints = function () {
        for (var iterations = 0; iterations < 17; iterations++) {
            for (var i = 0; i < particles.length; i++) {
                particles[i].satisfyConstraints();
            }
        }
    };

    var updateAll = function () {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }

    for (var i = 0; i < 60; i++) {
        particles[i] = Particle(canvas, i * 8 + offset, 2);
        if (i == 0) {
            particles[i].addConstraint(new Constraint(startElement, 4));
        }
        else {
            particles[i].addConstraint(new Constraint(particles[i - 1], 8));
        }
    }

    return {
        onTick: onTick,
        toggleWind: toggleWind
    };
}
