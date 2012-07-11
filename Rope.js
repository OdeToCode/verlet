var Rope = function () {
};


Rope.prototype =
{
    onLoad: function (control, userContext, rootElement) {
        // initialize timer and control
        this.control = control;
        this.timer = rootElement.findName('timer');
        this.timer.addEventListener("completed", Silverlight.createDelegate(this, this.onTick));

        // initialize particles
        this.particles = new Array();
        var offset = this.control.width / 2;
        for (var i = 0; i < 12; i++) {
            this.particles[i] = new Particle(control, rootElement, i * 32 + offset, 2);
            if (i == 0) {
                // first particle is constained to its starting position
                var startElement =
                {
                    left: function () { return offset; },
                    top: function () { return 2; }
                }
                this.particles[i].constraints.push(new Constraint(startElement, 4));
            }
            else {   // all other particles constained to the previous particle
                this.particles[i].constraints.push(new Constraint(this.particles[i - 1], 30));
            }

        }

        // initialize forces and time (its all relative)
        this.gravityVector = new Point(0, 0.9);
        this.timeStep = 0.25 // lower values to slow down
        this.canvas = rootElement;
        this.wind = false;
        this.windVector = new Point(0, 0);

        // start the show
        this.timer.begin();
    },

    onTick: function (sender, eventArgs) {
        // the main loop - verlet algorithm
        // 
        this.accumulateForces();
        this.verlet();
        this.satisfyConstraints();
        this.updateAll();
        this.timer.begin();
    },

    toggleWind: function () {
        this.wind = !this.wind
        // add a little horizontal disturbance...
        if (this.wind) {
            this.windVector.x = 1.2; // = Math.random();
            this.windVector.y = 0;
        }
    },

    accumulateForces: function () {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].forcePoint.init();
            this.particles[i].forcePoint.add(this.gravityVector);
            if (this.wind) {
                this.particles[i].forcePoint.add(this.windVector);
            }
        }
    },

    verlet: function () {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].verlet(this.timeStep);
        }
    },

    satisfyConstraints: function () {
        // hack: assume all particles of same size
        var maxy = this.control.height - this.particles[0].height;
        var maxx = this.control.width - this.particles[0].width;

        // one of the keys to verlet is picking the right number 
        // of iterations for the scene. not sure what works best
        // for this, but < 15 seems pretty unstable...
        for (var iterations = 0; iterations < 17; iterations++) {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].satisfyConstraints();
                this.particles[i].currentPoint.min(0, 0);
                this.particles[i].currentPoint.max(maxx, maxy);
            }
        }
    },

    updateAll: function () {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }
}