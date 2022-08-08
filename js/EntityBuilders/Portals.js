
function Portal( position, size, sense, color){

    let portal = world.createEntity()
    .addComponent(Shape, { type : 'box' , primitive : new Box( size.x, size.y) })
    .addComponent(Style, { background: color})
    .addComponent(Position, { x : position.x, y : position.y})
    .addComponent(Sense, { x : sense.x, y : sense.y})
    .addComponent(Composite)
    .addComponent(_Portal);

    Tree.addEntity(portal,
        world.createEntity()
        .addComponent(Position, { x : position.x + size.x / 2, y : position.y + size.y / 2})
        .addComponent(Style, { background: color , border: color, borderWidth : 10, alpha : 0.02})
    );

    return portal;

}