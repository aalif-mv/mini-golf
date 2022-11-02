
// Takes a vector and a line
// Returns with the vector of the lines closest point to the given vector
function closestPointOnLS(p, w1){
    let ballToWallStart = w1.start.subtr(p);
    if(Vector.dot(w1.dir, ballToWallStart) > 0){
        return w1.start;
    }

    let wallEndToBall = p.subtr(w1.end);
    if(Vector.dot(w1.dir, wallEndToBall) > 0){
        return w1.end;
    }

    let closestDist = Vector.dot(w1.dir, ballToWallStart);
    let closestVect = w1.dir.mult(closestDist);
    return w1.start.subtr(closestVect);
}

// Takes 2 endpoints of 2 line segments (aka 4 vectors)
// Returns with the intersection vector or false if there is no intersection
function lineSegmentIntersection(p1,p2,q1,q2){
    let resultVector = new Vector(0,0)
    let r = p2.subtr(p1)
    let s = q2.subtr(q1)
    let qp = q1.subtr(p1)
    let denom = Vector.cross(r,s)
    
    let u = Vector.cross(qp,r) / denom;
    let t = Vector.cross(qp,s) / denom;

    // Case 1: two line segments are parallel and non-intersecting
    if(denom === 0 && Vector.cross(qp,r) !== 0){
        return false
    }
    // Case 2: two line segments are collinear
    if(denom === 0 && Vector.cross(qp,r) === 0){
        // True: overlapping, false: disjoint
        if(((q1.x-p1.x < 0)&&(q1.x-p2.x < 0)&&(q2.x-p1.x < 0)&&(q2.x-p2.x < 0)) &&
            ((q1.y-p1.y < 0)&&(q1.y-p2.y < 0)&&(q2.y-p1.y < 0)&&(q2.y-p2.y < 0))){
            return false
        } else {
            resultVector = p2   // fix...
            return resultVector
        }
    }
    // Case 3: If 0<=t<=1 and 0<=u<=1, they have an intersection, otherwise nope
    if((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)){
        resultVector = p1.add(r.mult(t))
        return resultVector
    } else {
        return false
    }     
}

//Separating axis theorem on two objects
//Returns with the details of the Minimum Translation Vector (or false if no collision)
function sat(o1, o2){
    let minOverlap = null;
    let smallestAxis;
    let vertexObj;

    let axes = findAxes(o1, o2);
    let proj1, proj2 = 0;
    let firstShapeAxes = getShapeAxes(o1);

    for(let i=0; i<axes.length; i++){
        proj1 = projShapeOntoAxis(axes[i], o1);
        proj2 = projShapeOntoAxis(axes[i], o2);
        let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
        if (overlap < 0){
            return false;
        }

        if((proj1.max > proj2.max && proj1.min < proj2.min) ||
          (proj1.max < proj2.max && proj1.min > proj2.min)){
              let mins = Math.abs(proj1.min - proj2.min);
              let maxs = Math.abs(proj1.max - proj2.max);
              if (mins < maxs){
                  overlap += mins;
              } else {
                  overlap += maxs;
                  axes[i] = axes[i].mult(-1);
              }
          }

        if (overlap < minOverlap || minOverlap === null){
            minOverlap = overlap;
            smallestAxis = axes[i];
            if (i<firstShapeAxes){
                vertexObj = o2;
                if(proj1.max > proj2.max){
                    smallestAxis = axes[i].mult(-1);
                }
            } else {
                vertexObj = o1;
                if(proj1.max < proj2.max){
                    smallestAxis = axes[i].mult(-1);
                }
            }
        }  
    };

    let contactVertex = projShapeOntoAxis(smallestAxis, vertexObj).collVertex;
    //smallestAxis.drawVec(contactVertex.x, contactVertex.y, minOverlap, "blue");

    if(vertexObj === o2){
        smallestAxis = smallestAxis.mult(-1);
    }

    return {
        pen: minOverlap,
        axis: smallestAxis,
        vertex: contactVertex
    }
}

//Helping functions for the SAT below
//returns the min and max projection values of a shape onto an axis
function projShapeOntoAxis(axis, obj){
    setBallVerticesAlongAxis(obj, axis);
    let min = Vector.dot(axis, obj.vertex[0]);
    let max = min;
    let collVertex = obj.vertex[0];
    for(let i=0; i<obj.vertex.length; i++){
        let p = Vector.dot(axis, obj.vertex[i]);
        if(p<min){
            min = p;
            collVertex = obj.vertex[i];
        } 
        if(p>max){
            max = p;
        }
    }
    return {
        min: min,
        max: max, 
        collVertex: collVertex
    }
}

//finds the projection axes for the two objects
function findAxes(o1, o2){
    let axes = [];
    if(o1 instanceof Circle && o2 instanceof Circle){
        if(o2.pos.subtr(o1.pos).mag() > 0){
            axes.push(o2.pos.subtr(o1.pos).unit());
        } else {
            axes.push(new Vector(Math.random(), Math.random()).unit());
        }        
        return axes;
    }
    if(o1 instanceof Circle){
        axes.push(closestVertexToPoint(o2, o1.pos).subtr(o1.pos).unit());
    }
    if(o1 instanceof Line){
        axes.push(o1.dir.normal());
    }   
    if (o1 instanceof Rectangle){
        axes.push(o1.dir.normal());
        axes.push(o1.dir);
    }
    if (o1 instanceof Triangle){
        axes.push(o1.vertex[1].subtr(o1.vertex[0]).normal());
        axes.push(o1.vertex[2].subtr(o1.vertex[1]).normal());
        axes.push(o1.vertex[0].subtr(o1.vertex[2]).normal());
    }
    if (o1 instanceof Polygon){
        for (let i = 0; i < o1.vertex.length-1; i++) {
            axes.push(o1.vertex[i+1].subtr(o1.vertex[i]).normal());
        }
        axes.push(o1.vertex[0].subtr(o1.vertex[o1.vertex.length-1]).normal());
    }
    if (o2 instanceof Circle){
        axes.push(closestVertexToPoint(o1, o2.pos).subtr(o2.pos).unit());
    }
    if (o2 instanceof Line){
        axes.push(o2.dir.normal());
    }   
    if (o2 instanceof Rectangle){
        axes.push(o2.dir.normal());
        axes.push(o2.dir);
    }
    if (o2 instanceof Triangle){
        axes.push(o2.vertex[1].subtr(o2.vertex[0]).normal());
        axes.push(o2.vertex[2].subtr(o2.vertex[1]).normal());
        axes.push(o2.vertex[0].subtr(o2.vertex[2]).normal());
    }
    if (o2 instanceof Polygon){
        for (let i = 0; i < o2.vertex.length-1; i++) {
            axes.push(o2.vertex[i+1].subtr(o2.vertex[i]).normal());
        }
        axes.push(o2.vertex[0].subtr(o2.vertex[o2.vertex.length-1]).normal());
    }
    return axes;
}

//iterates through an objects vertices and returns the one that is the closest to the given point
function closestVertexToPoint(obj, p){
    let closestVertex;
    let minDist = null;
    for(let i=0; i<obj.vertex.length; i++){
        if(p.subtr(obj.vertex[i]).mag() < minDist || minDist === null){
            closestVertex = obj.vertex[i];
            minDist = p.subtr(obj.vertex[i]).mag();
        }
    }
    return closestVertex;
}

//returns the number of the axes that belong to an object
function getShapeAxes(obj){
    if(obj instanceof Circle || obj instanceof Line){
        return 1;
    }
    if(obj instanceof Rectangle){
        return 2;
    }
    if(obj instanceof Triangle){
        return 3;
    }
    if(obj instanceof Polygon) {
        return obj.vertex.length;
    }
}

//the ball vertices always need to be recalculated based on the current projection axis direction
function setBallVerticesAlongAxis(obj, axis){
    if(obj instanceof Circle){
        obj.vertex[0] = obj.pos.add(axis.unit().mult(-obj.r));
        obj.vertex[1] = obj.pos.add(axis.unit().mult(obj.r));
    }
}
//Thats it for the SAT and its support functions

//Collision is handled based on the body layer
//Layer -1: collision handling with layer 0 bodies ONLY
//Layer -2: no collision handling with any other body
function collisionHandlingCondition(body1, body2){
    return (
        (body1.layer === body2.layer && !(body1.layer === -1 || body1.layer === -2)) ||
        (body1.layer === 0 && body2.layer !== -2) || 
        (body2.layer === 0 && body1.layer !== -2) 
    )
}

//Prevents objects to float away from the canvas
function putWallsAround(x1, y1, x2, y2){
    let edge1 = new Wall(x1, y1, x2, y1);
    let edge2 = new Wall(x2, y1, x2, y2);
    let edge3 = new Wall(x2, y2, x1, y2);
    let edge4 = new Wall(x1, y2, x1, y1);
}

function collide(o1, o2){
    let bestSat = {
        pen: null,
        axis: null,
        vertex: null
    }
    for(let o1comp=0; o1comp<o1.comp.length; o1comp++){
        for(let o2comp=0; o2comp<o2.comp.length; o2comp++){
            if(sat(o1.comp[o1comp], o2.comp[o2comp]).pen > bestSat.pen){
                bestSat = sat(o1.comp[o1comp], o2.comp[o2comp]);
            }
        }
    }
    if (bestSat.pen !== null){
        return bestSat;
    } else {
        return false;
    }
}