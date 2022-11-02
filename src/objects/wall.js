class Wall extends Body{
    constructor(x1, y1, x2, y2){
        super();
        this.start = new Vector(x1, y1);
        this.end = new Vector(x2, y2);
        this.comp = [new Line(x1, y1, x2, y2)];
        this.dir = this.end.subtr(this.start).unit();
        this.pos = new Vector((x1+x2)/2, (y1+y2)/2);
    }
}