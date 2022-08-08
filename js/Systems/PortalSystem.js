
class PortalSystem extends System{

    onSnakeTeleport(data){

        let portal = data.portal;
        let snake  = data.snake;

        console.log(snake);

        let _portal        = portal.getComponent(_Portal);
        let snakePosition  = snake.getMutableComponent(Position);
        let snakeVelocity  = snake.getMutableComponent(Velocity);
        let portalPosition =  portal.getComponent(Position);
        let linkPosition   = _portal.link.getComponent(Position); // The position of the linked portal
        let portalSense    = portal.getComponent(Sense);
        let linkSense      = _portal.link.getComponent(Sense);

        if(((portalSense.x == 0) != (snakeVelocity.x == 0)) || ((portalSense.y == 0) != (snakeVelocity.y == 0))){

            EVENT_MANAGER.notify({
                'snake' : snake
            }, 'onSnakeCrashesSun');

            return;
        }

        let point = Vector2D.sub(portalPosition, snakePosition); 
                            
        let temp = snakeVelocity.x;
        snakeVelocity.x = snakeVelocity.y;
        snakeVelocity.y = temp;
        snakePosition.x =  linkPosition.x + snakeVelocity.x;
        snakePosition.y =  linkPosition.y + snakeVelocity.y;
        snakePosition.y -=  point.x * linkSense.x;
        snakePosition.x -=  point.y * linkSense.y;
        world.getSystem(SnakeSystem).partition(snake);
    }

    linkPortals( portal1, portal2 ){

        if(portal1.hasComponent(_Portal) && portal2.hasComponent(_Portal)){

            let size1 = portal1.getComponent(Shape).primitive;
            let size2 = portal1.getComponent(Shape).primitive;

            //Portals must be the same size to be linked

            if(size1.width * size1.height == size2.width * size2.height){

                let portalA = portal1.getMutableComponent(_Portal).link = portal2;
                let portalB = portal2.getMutableComponent(_Portal).link = portal1;
            }
            else{
                throw Error("Cannot link two portals with different areas");
            }
        }
        else{
            throw Error("Trying to link two entities which aren't portals");
        }

    }

}


PortalSystem.queries = {

    portals:  { components: [ Position, Shape, _Portal, Sense ] },
    snakes:   { components: [ Position, Shape, _Snake ] }
};
