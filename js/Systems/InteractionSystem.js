
class InteractionSystem extends System {

    execute(delta, time){

        var snakes  = this.queries.snakes.results,
            stars   = this.queries.stars.results,
            portals = this.queries.portals.results,
            snakePosition;

        // Snakes

        for(let i = 0; i < snakes.length; i++){

            if(!snakes[i].getComponent(_Snake).alive){
                continue;
            }
            
            snakePosition = snakes[i].getComponent(Position);


            // * Snake ^ Sun   --------------------------------------------------------

            if(CollisionDetector.pointInCircle(snakePosition, sun)){
                
                EVENT_MANAGER.notify({
                    'snake' : snakes[i]
                }, 'onSnakeCrashesSun');

            }

            // * Snake ^ Snake --------------------------------------------------------

            for(let x = 0; x < snakes.length; x++){

                let snakeB = snakes[x];
                let snakeB_items = snakeB.getComponent(Composite).items;
                let n = snakeB_items.length;

                for(let y =  n - (snakeB == snakes[x] ? 3 : 0); y >= 0; y--){

                    if( CollisionDetector.pointInBox(snakePosition, snakeB_items[y])){

                        EVENT_MANAGER.notify({
                            'crashedSnake' : snakes[i], 
                            'wallSnake'    : snakeB
                        }, 'onSnakeCrashesSnake');
                        
                    }
                }
            }


            // * Snake ^ Star --------------------------------------------------------
            
            for(let x = 0; x < stars.length; ){

                if( CollisionDetector.pointInCircle(snakePosition, stars[x]) ){


                    EVENT_MANAGER.notify({
                        'snake' : snakes[i],
                        'star'  : stars[x]
                    },'onSnakeEatsStar');


                    if(stars[x].hasComponent(Composite)){
                        Tree.delete(stars[x]);   
                    }
                    
                    world.entityManager.removeEntity(stars[x]);

                }
                x++;
            }


            // * Snake ^ Portal --------------------------------------------------------

            for(let x = 0; x < portals.length; x++){

                if(CollisionDetector.BoxVsBox(snakes[i] ,portals[x])){

                    EVENT_MANAGER.notify({
                        'snake' : snakes[i],
                        'portal': portals[x]
                    },'onSnakeTeleport');
                };
            }
        }
    }
}

//Queries

InteractionSystem.queries = {

    snakes : { components: [_Snake, Position] },
    stars  : { components: [_Star, Position, Shape] },
    portals: { components: [_Portal, Position ,Shape] }  

};