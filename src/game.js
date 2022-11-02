class Game {
    static score = {};
    static level = 0;
    static hits = 0;
    static levelToPlay = 1;
    static pauseBtn = new Image();
    static currentLevel = 0;
    static currentLevelStateLost = false;
    static newLevel(l) {
        Game.currentLevelStateLost = false;
        Game.currentLevel = l;
        Game.level = l;
        Game.hits = 0;
        loadLevel(Game.level + '');
    }
    static renderGameUi() {
        // power indicator holder

        ctx.beginPath();
        ctx.moveTo(BALLS['0'].pos.x + 24 - 6, BALLS['0'].pos.y + 25)
        ctx.arc(BALLS['0'].pos.x + 24, BALLS['0'].pos.y - 25, 6, Math.PI, 0);
        ctx.arc(BALLS['0'].pos.x + 24, BALLS['0'].pos.y + 25, 6, 0, Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;

        // power indicator

        let p = BALLS['0'].power;
        // let dist = hypotenuse(Controller.Mouse.move.pos.x - BALLS['0'].pos.x , Controller.Mouse.move.pos.y - BALLS['0'].pos.y)
        let color = [255, 255, 45];
        color[1] -= scale(p, 0, 50, 100, 240);
        ctx.beginPath();
        ctx.arc(BALLS['0'].pos.x + 24, (BALLS['0'].pos.y + 25) - p, 6, Math.PI, 0);
        ctx.arc(BALLS['0'].pos.x + 24, BALLS['0'].pos.y + 25, 6, 0, Math.PI);
        ctx.fillStyle = 'rgb(' + color.join() + ')';
        ctx.fill();
    }
    static renderUI() {
        ctx.beginPath();
        ctx.font = '50px sunnySpells';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText('Hits: ' + Game.hits, 20, canvas.height - 62);

        ctx.drawImage(Game.pauseBtn, 520, canvas.height - 59, 60, (60 * 12) / 16);
    }
    static startGame(r = false) {
        if (r) {
            Game.newLevel(Game.currentLevel);
            hideUI();
            engine.start();
        } else {
            Game.newLevel(Game.levelToPlay);
            hideUI();
            engine.start();
        }
    }
    static loadGame(e) {
        Game.newLevel(e.innerText[0]);
        hideUI();
        engine.start();
    }
    static pause(x, y) {
        if (engine.running) {
            if (x >= 520 && x <= 520 + 60 && y >= canvas.height - 59 && y <= (canvas.height - 59) + ((60 * 12) / 16)) {
                toggleMenu('pause');
                engine.stop();
            }
        }
    }
}