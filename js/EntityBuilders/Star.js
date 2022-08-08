
function  GameStar(position){

    primary = "255,230,153";
    secondary = "255,192,0";

    let obj = world.createEntity()

        .addComponent(Shape, { type : "circle" , primitive : new Circle(14)})
        .addComponent(Position, { x : position.x, y : position.y})
        .addComponent(Style, { background: `rgba(${secondary}, 0.2)`})
        .addComponent(_Star)
        .addComponent(Velocity, {})
        .addComponent(Composite);
   // 
    Tree.addEntity( obj, 
        world.createEntity()
        .addComponent(Shape, { type : "circle" , primitive : new Circle(6)})
        .addComponent(Position, { x : position.x, y : position.y})
        .addComponent(Style, { background: `rgba(${primary})`, border: `rgb(${secondary})`, borderWidth : 4})
    );
   // 
    Tree.addEntity(obj,
        world.createEntity()
        .addComponent(Shape, { type : "circle" , primitive : new Circle(30)})
        .addComponent(Position, { x : position.x, y : position.y})
        .addComponent(Style, { background: 'rgb(${secondary})' , border: `rgb(${secondary})`, borderWidth : 10, alpha : 0.01})
    );

    return obj;
}
