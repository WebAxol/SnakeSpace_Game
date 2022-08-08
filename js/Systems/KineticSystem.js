
/*------ Kinetic System-----*/

class KineticSystem extends System {

    execute( delta, time ){
        this.queries.moving.results.forEach( entity => {

            var velocity = entity.getMutableComponent(Velocity);
            var position = entity.getMutableComponent(Position);

            if(entity.hasComponent(Acceleration)){

                let acceleration = entity.getMutableComponent(Acceleration)

                velocity.x *= 0.99;
                velocity.y *= 0.99;
                velocity.x += acceleration.x;
                velocity.y += acceleration.y;
                    
            }

            position.x += velocity.x;
            position.y += velocity.y;


            this.outCanvas(entity);

        });
    }

    outCanvas(entity){

        var position = entity.getMutableComponent(Position);
        let out = false;

        if(position.x > canvasWidth){
            position.x = 0;
            out = true;
        }
        if(position.y > canvasHeight){
            position.y = 0;
            out = true;
        }
        if(position.x < 0){
            position.x = canvasWidth;
            out = true;
        }
        if(position.y < 0){
            position.y = canvasHeight;
            out = true;
        }

        if(out && entity.hasComponent(_Snake)){
            world.getSystem(SnakeSystem).partition(entity);
        }
    }
};

//Queries

KineticSystem.queries = {
    moving: {
        components: [ Position, Velocity ]
    }
};
