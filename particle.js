class Particle {
    constructor (x, y, is_shell = false, hu) {
        this.pos = createVector (x, y);
        this.acc = createVector (0, 0);
        this.shell = is_shell;
        if (!this.shell)
            this.vel = createVector (0, random(-12, -8));  // Go up
        else {
            this.vel = p5.Vector.random2D ();
            this.vel.mult (random(2, 12));  // Otherwise their mag will be same
        }
        this.hu = hu;
        this.lifespan = 255;
    }

    applyForce (force) {
        this.acc.add (force)
    }

    update () {
        if (this.shell) {
            this.vel.mult (0.9);
            this.lifespan -= 4;
        }
        this.vel.add (this.acc);
        this.pos.add (this.vel);
        this.acc.mult(0);
    }

    done () {
        return this.lifespan < 0;
    }

    show () {
        colorMode (HSB);
        if (!this.shell) {    // Rocket going up
            strokeWeight (4);
            stroke (this.hu, 255, 255);
        } else {        // Shell after explosion
            strokeWeight (2);
            stroke (this.hu, 255, 255, this.lifespan);
        }
        point (this.pos.x, this.pos.y);
    }
}