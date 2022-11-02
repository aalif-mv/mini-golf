class Pointer {
    static pos = new Vector();
    static pointer = window.addEventListener('click', function(e) {
        Pointer.pos.x = e.x;
        Pointer.pos.y = e.y;
    });
}