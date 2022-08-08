
class SnakeSystem extends System{

    execute( delta, time){

        this.queries.snakes.results.forEach( entity => {

            var alive    = entity.getComponent(_Snake).alive;

            if(alive && Input.keypressed){

                var velocity = entity.getMutableComponent(Velocity);

                switch(Input.keypressed){
                    case 'w' : 
                        velocity.y = -1 * GameSettings.cellsize; 
                        velocity.x = 0;
                        this.partition(entity);
                    break;
                    case 'a' : 
                        velocity.y = 0; 
                        velocity.x = -1 * GameSettings.cellsize;
                        this.partition(entity);
                    break;
                    case 's' : 
                        velocity.y = GameSettings.cellsize; 
                        velocity.x = 0;
                        this.partition(entity);
                    break;
                    case 'd' : 
                        velocity.y = 0; 
                        velocity.x = GameSettings.cellsize;
                        this.partition(entity);

                    break;
                    case 'q': 
                        this.grow(entity);
                    break;
                }
            }else{
            }
            this.dragTail(entity);
        });
    }


    getEnd(snake, size){
        size *= 8
        var velocity = snake.getComponent(Velocity);

        if(velocity.x > 0){ return { x : -size , y : GameSettings.cellsize } }
        if(velocity.x < 0){ return { x :  size , y : GameSettings.cellsize } }
        
        if(velocity.y > 0){ return { x : GameSettings.cellsize , y : -size } }
        if(velocity.y < 0){ return { x : GameSettings.cellsize , y :  size } }
    } 


    dragTail(snake){

        var composite = snake.getMutableComponent(Composite),
            velocity  = snake.getComponent(Velocity);

        if(composite.items.length == 0){
            return;
        }
        
        var last = Tree.last(snake),
            position = last.getMutableComponent(Position);

            position.x += velocity.x;
            position.y += velocity.y;

        var first = composite.items[0];

        let boxA  = last.getMutableComponent(Shape);
        let boxB  = first.getMutableComponent(Shape);
        boxA.primitive.width  -= velocity.x;
        boxA.primitive.height -= velocity.y;

        if(boxB.primitive.width == 0 ||boxB.primitive.height == 0){
            composite.items.shift();

            if(composite.items.length <= 0){
                world.entityManager.removeEntity(snake);
                return;
            }

        }
        
        first = composite.items[0];
        let sense = first.getComponent(Sense);
        boxB = first.getMutableComponent(Shape);
        boxB.primitive.width  += sense.x;
        boxB.primitive.height += sense.y;

    }

    /* ---- Create new rectangle, that will form part of snake ---- */


    newNode(snake){

        let velocity  = snake.getComponent(Velocity);
        let position  = Object.assign( {}, snake.getComponent(Position));
        let sense     = Object.assign( {}, velocity);

        let end = this.getEnd(snake, 0);

        if(velocity.x < 0){ position.x += GameSettings.cellsize }
        if(velocity.y < 0){ position.y += GameSettings.cellsize }


        let node = world.createEntity()
            .addComponent(Position, {x : position.x, y : position.y})            
            .addComponent(Sense,    {x : sense.x, y : sense.y})
            .addComponent(Shape,    {type : 'box', primitive : new Box( end.x, end.y)})
            .addComponent(Style,    {background: 'rgb(0,204,255)'});

        node.parent = snake;
        
        return node;

    }


    /*---- Split snake into more rectangles---- */


    partition(snake){
        var composite = snake.getMutableComponent(Composite);

        let node = this.newNode(snake);
        composite.items.push(node);
    }


    /* ---- Increase the size of last rectangle (tail) ---- */

    grow(snake){

        var composite = snake.getMutableComponent(Composite);

        if(composite.items.length == 0){
            this.partition(snake);
            return;
        }

        let sense = composite.items[0].getComponent(Sense);
        let box   = composite.items[0].getMutableComponent(Shape);

            box.primitive.width  -= 2 * sense.x;
            box.primitive.height -= 2 * sense.y;
    }

    /*----- EVENTS----- */
    
    onSnakeEatsStar(data){
        let snake = data['snake'];
        this.grow(snake);
    }

    onSnakeCrashesSun(data){
        let snake = data.snake;
        let velocity = snake.getMutableComponent(Velocity);
        snake.getMutableComponent(_Snake).alive = false;
        velocity.x = 0;
        velocity.y = 0;
    }



}

SnakeSystem.queries = {
    snakes: {
        components: [ Position, Velocity , Composite, _Snake]
    }
};
