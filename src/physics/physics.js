function updatePhysics(timestamp) {
    COLLISIONS.length = 0;
    
    BODIES.forEach((b) => {
        b.control();
        b.reposition();
    })
    
    BODIES.forEach((b, index) => {
        for(let bodyPair = index+1; bodyPair < BODIES.length; bodyPair++){
           if((BODIES[index].layer === BODIES[bodyPair].layer ||
               BODIES[index].layer === 0 || BODIES[bodyPair].layer === 0) && 
               collide(BODIES[index], BODIES[bodyPair])){
                    let bestSat = collide(BODIES[index], BODIES[bodyPair]);
                    // BODIES[bodyPair].angVel = 0;
                    COLLISIONS.push(new CollData(BODIES[index], BODIES[bodyPair], bestSat.axis, bestSat.pen, bestSat.vertex));
           }
        }
    });

    COLLISIONS.forEach((c) => {
        c.penRes();
        c.collRes();
    });
}