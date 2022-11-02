class Polygon{
    constructor(x, y, r, vertexNo = 8){
        this.color = ""
        this.vertex = [];
        this.texture = new Image();
        this.texture.src = 'assets/graphics/polygon.svg';
        for (let a = ((2*Math.PI)/vertexNo)/2, i = 0; a < 2*Math.PI; a+=(2*Math.PI)/vertexNo, i++) {
            this.vertex.push(new Vector(x+Math.cos(a)*r, y+Math.sin(a)*r));
        }
        this.pos = new Vector(x, y);
        this.dir = this.vertex[0].subtr(this.pos).unit();
        this.refDir = this.dir;
        this.r = r;
        this.refDiam = [];
        for (let i = 0; i < this.vertex.length; i++) {
            this.refDiam.push(this.vertex[i].subtr(this.pos));
        }
        this.angle = 0;
        this.selected = false;
        this.rotMat = new Matrix(2,2);
    }

    draw(){
        ctx.beginPath();
        ctx.drawImage(this.texture, this.pos.x - this.r +2, this.pos.y - this.r+2, this.r*2-4, this.r*2-4)
        ctx.closePath();
    }

    getVertices(angle){
        this.rotMat.rotMx22(angle);
        this.dir = this.rotMat.multiplyVec(this.refDir);
        for (let i = 0; i < this.vertex.length; i++) {
            this.vertex[i] = this.pos.add(this.rotMat.multiplyVec(this.refDiam[i]));
        }
    }
}