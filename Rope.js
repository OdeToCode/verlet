var Rope = function (canvas) {

    var context = canvas.getContext("2d");    
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
    var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0.5, "white");
    gradient.addColorStop(1, "red");

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

        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.moveTo(particles[0].getX(), particles[0].getY());

        for (var i = 1; i < particles.length; i++) {
            context.lineTo(particles[i].getX(), particles[i].getY());
        }
        context.stroke();
        context.endPath();
    }

    for (var i = 0; i < 50; i++) {
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
