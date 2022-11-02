class Ball extends Body{
    constructor(x, y, r, m, id, b = false){
        super();
        this.pos = new Vector(x, y);
        this.comp = [new Circle(x, y, r, b)];
        this.id = id;
        this.m = m;
        this.radius = r;
        this.aiming = false;
        this.dirAngle = 0;
        this.color = "white";
        this.power = 0;
        this.arrow = new Image();
        this.arrow.src = "assets/graphics/arrow.svg";
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
    }

    setPosition(x, y, a = this.angle){
        this.pos.set(x, y);
        this.comp[0].pos = this.pos;
    }

    reposition(){
        super.reposition();
        this.setPosition(this.pos.add(this.vel).x, this.pos.add(this.vel).y);
    }

    control(){
        for (let i = 0; i < HOLES.length; i++) {
            if (hypotenuse(HOLES[i].pos.x - this.pos.x, HOLES[i].pos.y - this.pos.y) + 10 <= HOLES[i].r) {
                this.remove();
            }
        }
        if (hypotenuse(Controller.Mouse.click.pos.x - this.pos.x, Controller.Mouse.click.pos.y - this.pos.y) < this.radius && Controller.Mouse.click.clicked) {
            this.aiming = true;
        }
    }

    trace() {
        if (BALLS["0"] != undefined && BALLS["0"].aiming && Controller.Mouse.click.clicked && BALLS["0"].vel.x < 0.001 && BALLS["0"].vel.y < 0.001) {
            let mouse = Controller.Mouse.move.pos.subtr(BALLS["0"].pos);
            let power = hypotenuse(mouse.x , mouse.y)/4;
            if (power >= 50) {power = 50}
            this.power = power;
            this.dirAngle = (toDegrees(Math.atan2(Vector.cross(new Vector(0, 10), mouse), Vector.dot(new Vector(0, 10), mouse))));
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(toRadians(this.dirAngle));
            ctx.drawImage(this.arrow,  -20 , -77.5, 40, 77.5);
            // ctx.fillRect(-20 , -77.5, 40, 77.5)
            ctx.restore()
        }
    }

    release() {
        if (Object.keys(BALLS).length != 0 && hypotenuse(Controller.Mouse.click.pos.x - BALLS["0"].pos.x, Controller.Mouse.click.pos.y - BALLS["0"].pos.y) < BALLS["0"].radius && BALLS["0"].vel.x < 0.001 && BALLS["0"].vel.y < 0.001 && engine.running) {
            BALLS["0"].aiming = false;
            for (let i = 0; i < Object.keys(BALLS).length; i++) {
                BALLS[i + ""].dirAngle = 0;
                BALLS[i + ""].vel.set((BALLS["0"].pos.x - Controller.Mouse.move.pos.x)/20, (BALLS["0"].pos.y - Controller.Mouse.move.pos.y)/20);
                console.log((BALLS["0"].pos.x - Controller.Mouse.move.pos.x)/20, (BALLS["0"].pos.y - Controller.Mouse.move.pos.y)/20);
            }
            Game.hits += 1;
        }
    }

    remove() {
        super.remove();
        if (BALLS[Object.keys(BALLS).find(key => BALLS[key] === this)] == this){
            // 
            delete BALLS[Object.keys(BALLS).find(key => BALLS[key] === this)];
            console.log('del')
        }
        if (Object.keys(BALLS).length === 0) {
            console.log('won');
            return;
        }
        if (Object.keys(BALLS).length === 1 && BALLS["0"] == undefined) {
            Game.currentLevelStateLost = false;
        }
    }
}