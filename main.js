const BODIES = [];
const COLLISIONS = [];
const BALLS = {};
const HOLES = [];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = 'assets/graphics/background.svg';
Game.pauseBtn.src = 'assets/graphics/pause_btn.svg';

putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);

Controller.Mouse.click.onMouseClick.push(Game.pause);

var loadLevel = function(level) {
    HOLES.length = 0;
    Object.keys(BALLS).length = 0;
    BODIES.length = 0;
    putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight - 75);
    new Wall(canvas.width/2, 0, canvas.width/2, canvas.height - 75);

    LEVELS[level].balls.forEach((b,i) => {
        BALLS[i + ""] = new Ball(b.x, b.y, 10, 10, i + "", true);
    });
    LEVELS[level].holes.forEach((h) => {
        console.log(h.x, h.y, h.r)
        HOLES.push(new Circle(h.x, h.y, h.r));
    });
    LEVELS[level].obstacles.forEach((o) => {
        switch (o.object) {
            case "wall":
                new Wall(o.x1, o.y1, o.x2, o.y2);
                break;
            case "box":
                new Box(o.x, o.y, o.x + o.w, o.y, o.w, o.m);
                break;
            case "custom":
                new Custom(o.x, o.y, o.r, o.vN, o.m);
                break;
            default:
                break;
        }
    });

    Controller.Mouse.click.onMouseUp.length = 0;
    Controller.Mouse.click.onMouseUp.push(BALLS["0"].release);

}

var update = function() {
    updatePhysics();
}

var render = function() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // ctx.drawImage(background, 0, 0);
    ctx.globalAlpha = 1;
    HOLES.forEach((h) => {
        h.draw();
    });
    BODIES.forEach((b) => {
        b.render();
    });
    if (BALLS["0"] != undefined) {
        Game.renderGameUi();
    }
    Game.renderUI();
}

const engine = new Engine(1000/60, update, render);
const uiEngine = new Engine(1000/30, UI.updateUI, UI.renderUI);


// engine.start();