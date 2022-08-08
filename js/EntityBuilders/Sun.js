
function Sun(){

    let x =  canvasWidth  / 2;
    let y =  canvasHeight / 2;
    //255,13,102

    secondary = "255, 208, 127";
    primary   = "#f57384"

    let sun = world.createEntity()
        .addComponent(Shape, { type : "circle" , primitive : new Circle(70 * (canvasWidth / 3000))})
        .addComponent(Position, { x : x , y : y})
        .addComponent(Style, { background: '#FFE69A' , border: `#FFD24C`, borderWidth : 10})
        .addComponent(Forcefield, { force : 1000, field : 100 * (canvasWidth / 3000)})
        .addComponent(Composite);


    let lightA = world.createEntity()
        .addComponent(Shape, { type : "circle" , primitive : new Circle(250 * (canvasWidth / 3000))})
        .addComponent(Position, { x : x , y : y})
        .addComponent(Style, { background: `rgba(${secondary},0.05)`});


    let lightB = world.createEntity()
        .addComponent(Shape, { type : "circle" , primitive : new Circle(150 * (canvasWidth / 3000))})
        .addComponent(Position, { x : x , y : y})
        .addComponent(Style, { background: `rgba(${secondary},0.05)`})
        //.addComponent(Forcefield, { force : -150, field : 1000 });

    Tree.addEntity( sun, lightA);
    Tree.addEntity( sun, lightB);

    return sun;
}
