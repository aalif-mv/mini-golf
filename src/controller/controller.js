class Controller {
    static keyMap = new Map();
    static keyDown = window.addEventListener('keydown', function(e) {
        Controller.keyMap.set(e.key.toUpperCase(), e.type === "keydown");
    });
    static keyUp = window.addEventListener('keyup', function(e) {
        Controller.keyMap.set(e.key.toUpperCase(), e.type === "keydown");
    });

    static Mouse = {click: {pos: new Vector(), clicked: false, onMouseDown: [], onMouseUp: [], onMouseClick: []},
                    move: {pos: new Vector()}};

    static mouseDown = window.addEventListener('mousedown', function(e) {
        Controller.Mouse.click.pos.set(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
        Controller.Mouse.click.clicked = true;
        for (let i = 0; i < Controller.Mouse.click.onMouseDown.length; i++) {
            const mouseFunction = Controller.Mouse.click.onMouseDown[i];
            mouseFunction()
        }
    });
    static mouseDown = window.addEventListener('click', function(e) {
        let x = e.x - canvas.offsetLeft;
        let y = e.y - canvas.offsetTop;
        for (let i = 0; i < Controller.Mouse.click.onMouseClick.length; i++) {
            const mouseFunction = Controller.Mouse.click.onMouseClick[i];
            mouseFunction(x, y);
        }
    });
    static mouseUp = window.addEventListener('mouseup', function(e) {
        Controller.Mouse.click.clicked = false;
        for (let i = 0; i < Controller.Mouse.click.onMouseUp.length; i++) {
            const mouseFunction = Controller.Mouse.click.onMouseUp[i];
            mouseFunction()
        }
    });
    static mouseMove = window.addEventListener('mousemove', function(e) {
        Controller.Mouse.move.pos.set(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
        // console.log(Controller.Mouse.move.pos.x ,Controller.Mouse.move.pos.y);
    });
}