
function Sacacanas(position, radius){

    let obj = world.createEntity()

        .addComponent(Shape, { type : "circle" , primitive : new Circle(radius)})
        .addComponent(Position, position)
        .addComponent(Style, { border :  "rgb(255,13,102)", borderWidth: 6 })
        .addComponent(_Star)
        .addComponent(Velocity, {})
        .addComponent(HasPhysics, {mass : radius * radius / 5})
        .addComponent(Forcefield,{ force: radius * radius * 15, field: radius})
        .addComponent(Acceleration, {});

    return obj;
}