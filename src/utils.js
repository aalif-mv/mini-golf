// Returns with a number rounded to <precision> decimals
function round(number, precision){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}

// Returns with a random integer
function randInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

// Draws a circle around a specific point
function testCircle(x, y, color="black"){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}


function toDegrees (angle) {
    return angle * (180 / Math.PI);
}
function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function hypotenuse(op, aj) {
    return Math.sqrt(Math.pow((op), 2) + Math.pow((aj), 2));
}
function crossMultiply(h, ph, oa) {
    return (oa * h) / ph;
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}