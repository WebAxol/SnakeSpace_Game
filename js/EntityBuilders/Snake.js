
function Snake( position, velocity){

    let snake = world.createEntity()
    .addComponent(Shape,    { type : "box" , primitive : new Box( GameSettings.cellsize, GameSettings.cellsize )} )
    .addComponent(Style,    { background: "white"})
    .addComponent(Position, { x :  position.x, y : position.y})
    .addComponent(Velocity, { x :  velocity.x * GameSettings.cellsize, y : velocity.y * GameSettings.cellsize})
    .addComponent(Forcefield, { force : -50, field : 500 })
    .addComponent(Composite)
    .addComponent(_Snake)

    for(let i = 0; i < 10; i++){
        world.getSystem(SnakeSystem).grow(snake);
    }

    return snake;
}