function test(x, y, r, vertexNo) {
    var vertex = [];
    for (let a = 0, i = 0; a < 2*Math.PI; a+=(2*Math.PI)/vertexNo, i++) {
        vertex.push(new Vector(x+Math.cos(a)*r, y+Math.sin(a)*r));
    }
    ctx.beginPath();
    ctx.moveTo(vertex[0].x, vertex[0].y);
    for (let i = 1; i < vertex.length; i++) {
        ctx.lineTo(vertex[i].x, vertex[i].y);
    }
    ctx.lineTo(vertex[0].x, vertex[0].y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    console.log(vertex);
    ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.stroke();
}
