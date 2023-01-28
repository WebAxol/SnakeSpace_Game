var canvas = document.querySelector("canvas"),
    canvasWidth  = canvas.width = window.innerWidth,
    canvasHeight = canvas.height = window.innerHeight,
    c = canvas.getContext('2d'),

//Colour palete
    primary = "rgb(255,230,153)",
    secondary = "255,192,0"



const world = new World();
const EVENT_MANAGER = new EventManager(world);

//Register Components

world
    .registerComponent(Position)
    .registerComponent(Velocity)
    .registerComponent(Acceleration)
    .registerComponent(Style)
    .registerComponent(Shape)
    .registerComponent(Sense)
    .registerComponent(_Snake)
    .registerComponent(HasPhysics)
    .registerComponent(Forcefield)
    .registerComponent(Particle)
    .registerComponent(_Star)
    .registerComponent(_Portal)
    .registerComponent(Composite);

//Register Systems

world
    .registerSystem(SnakeSystem)            // Coordinates, and controls the nodes of snakes, allowing more or less nodes to become part of snakes, aswell as movement.
    .registerSystem(ForceSystem)            // Makes repulsion and attraction forces to take place in electrostatic objects.  
    .registerSystem(KineticSystem)          // Updates the position of objects, considering their velocity.
    .registerSystem(PortalSystem) 
    .registerSystem(InteractionSystem)    
    .registerSystem(ParticleSystem)         // Updates the alpha value of particles and removes particles when their lifespan is over.
    .registerSystem(RendererSystem);        // Draws primitive shapes like polygons, boxes and circles.
//---------------------


function setUp(){

    let cell = GameSettings.cellsize; 

    Snake({ x : cell * 20, y : cell * 10}, { x : 1, y : 0});
    sun = Sun();


    for(let i = 0; i < 50; i++){
        GameStar({ x : Math.random() * canvasWidth, y : Math.random() * canvasHeight}, 12 + (Math.random() * 20));
    }

    for(let i = 0; i < 20; i++){
        Sacacanas({ x : Math.random() * canvasWidth, y : Math.random() * canvasHeight}, 12 + (Math.random() * 10));
    }

        
    world.getSystem(PortalSystem).linkPortals(
        Portal(
            { x : cell * 50, y : cell * 50 },
            { x : cell * 20, y : cell},
            { x : 0, y : 1}, "#0bc765"
        ),
        Portal(
            { x : cell * ((canvasWidth / cell) - 50), y : cell * ((canvasHeight / cell) - 50) },
            { x : cell, y : cell * 20},
            { x : 1, y : 0}, "#0bc765"
        )
    );

    world.getSystem(PortalSystem).linkPortals(
        Portal(
            { x : cell * ((canvasWidth / cell) - 50), y : cell *  50 },
            { x : cell * 20, y : cell},
            { x : 0, y : 1}, "#e5b70a"
        ),
        Portal(
            { x : cell * 50, y : cell * 150},
            { x : cell, y : cell * 20},
            { x : 1, y : 0}, "#e5b70a"
        )
    );


}

setUp();

