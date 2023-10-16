class Vehicle {
    constructor (x, y, target_x, target_y, hu) {
        this.pos = createVector (x, y);
        this.target = createVector (target_x, target_y);
        this.hu = hu;
        this.vel = p5.Vector.random2D();
        this.acc = createVector ();
        this.r = 2;
        this.rMax = 5;
        this.maxSpeed = 10;
        this.maxForce = 1;
    }

    applyForce (force) {
        this.acc.add (force)
    }

    behavior () {
        let arrivingSteer = this.arrive (this.target);
        arrivingSteer.mult (0.4);
        this.applyForce (arrivingSteer);
    }

    update () {
        this.vel.add (this.acc);
        this.pos.add (this.vel);
        this.acc.mult (0);
        this.r += 0.005
        if (this.r >= this.rMax)
            this.r = this.rMax;
    }

    arrive (target) {
        let desired = p5.Vector.sub (target, this.pos);
        let speed = this.maxSpeed;
        if (desired.mag() < 100)
            speed = map (desired.mag(), 0, 100, 0, speed);
        desired.setMag (speed);
        let steer = p5.Vector.sub (desired, this.vel);
        steer.limit (this.maxForce)
        return steer;
    }

    show () {
        colorMode(HSB)
        stroke (this.hu, 255, 255);
        strokeWeight (this.r);
        point (this.pos.x, this.pos.y)
    }
}