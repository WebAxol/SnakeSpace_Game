
// A repulsion and attraction system

class ForceSystem extends System {


    execute(){

        this.queries.passives.results.forEach( passive => {
            
            for(let i = 0 ; i < this.queries.actives.results.length; i++){

                let active = this.queries.actives.results[i];

                if(passive == active) continue;

                let delta = this.testCollision(passive,active);
                
                if(delta){
                    this.resolveCollision(passive,active,delta);
                }    
            }
        });
    }

    // Collision detection

    testCollision(passive,active){

        let force = active.getComponent(Forcefield);
        let range = force.field;

        if(passive.hasComponent(Forcefield)){
            range += passive.getComponent(Forcefield).field;
        }

        let delta = CollisionDetector.onRange(active, passive, range);

        return delta;
    }

    // Collision response

    resolveCollision(passive,active,delta){

        var mass = passive.getComponent(HasPhysics).mass,
            velocity = passive.getMutableComponent(Velocity),
            force = active.getComponent(Forcefield).force,
            direction = Vector2D.normalize(delta);

         velocity.x += - direction.x * (force / (20 * mass));
         velocity.y += - direction.y * (force / (20 * mass));

        if(velocity.x * velocity.x + velocity.y * velocity.y > 100){
            velocity = direction;
        }
    }

    // Optimization
    /*
    linearSort(){
        this.queries.passives.results.sort( (a, b) => {
            let positionA = a.getComponent(Position).x - a.getComponent(Shape).primitive.radius;
            let positionB = b.getComponent(Position).x - b.getComponent(Shape).primitive.radius;
            return positionA - positionB;
        });
        this.queries.actives.results.sort( (a, b) => {
            let positionA = a.getComponent(Position).x - a.getComponent(Shape).primitive.radius;
            let positionB = b.getComponent(Position).x - b.getComponent(Shape).primitive.radius;
            return positionA - positionB;
        })
    }
    testRange(passive, active){
        let passiveX = passive.getComponent(Position).x 
        let passiveRadius = passive.getComponent(Shape).primitive.radius; 
        let activeX  = passive.getComponent(Position).x 
        let activeRadius  = passive.getComponent(Shape).primitive.radius; 
        if( passiveX + passiveRadius > activeX - activeRadius &&
            passiveX < activeX){
            return true;
        }
        return false;

    }
    */
}

ForceSystem.queries = {

    actives  : { components : [Forcefield, Position] },          // Force exerciser
    passives : { components : [HasPhysics, Position, Velocity ]} // Force receivers
}