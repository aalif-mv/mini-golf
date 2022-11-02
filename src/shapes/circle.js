class Circle{
    constructor(x, y, r, ball = false){
        this.color = ""
        this.texture = new Image();
        this.texture.src = 'assets/graphics/ball.svg'
        this.vertex = [];
        this.pos = new Vector(x, y);
        this.r = r;
        this.selected = false;
        this.ball = ball;
    }

    draw(){
        ctx.beginPath();
        if (!this.ball){
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
            ctx.strokeStyle = "black";
            ctx.stroke();
        } else {
            ctx.drawImage(this.texture, this.pos.x - this.r, this.pos.y - this.r, this.r*2, this.r*2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.fillStyle = "";
        ctx.closePath();
    }
}