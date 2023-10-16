class Rocket {
    constructor (is_guided = false, shell_count = 100) {
        this.hu = random (255);
        this.guided = is_guided;
        this.shellCount = shell_count;
        this.firework = new Particle (random(width), height, false, this.hu);
        this.exploded = false;
        this.particles = [];
        this.finalShellPositions = [];
    }

    done () {
        return this.exploded && this.particles.length == 0;
    }

    update () {
        if (!this.exploded) {
            this.firework.applyForce (gravity)
            this.firework.update ();
            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode ();   // Will just create new population of shells
                explosionSound.play();
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce (gravity);
            this.particles[i].update ();
            if (this.particles[i].done ()) {
                this.finalShellPositions.push (createVector (this.particles[i].pos.x, this.particles[i].pos.y))
                this.particles.splice (i, 1);
            }
        }
    }

    explode () {
        for (let i = 0; i < this.shellCount; i++) {
            let p = new Particle (this.firework.pos.x, this.firework.pos.y, true, this.hu);
            this.particles.push (p)
        }
    }

    show () {
        if (!this.exploded)
            this.firework.show ();
        this.particles.forEach (p => {      // These are shells
            p.show ();
        });
    }
}