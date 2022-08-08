
class ParticleSystem extends System {

    execute( delta, time ){

        this.queries.particles.results.forEach( entity => {
            
            var style = entity.getMutableComponent(Style);
            var particle  = entity.getComponent(Particle);

            style.alpha -= particle.alphaChange;

            if(particle.sizeChange){
                let shape = entity.getMutableComponent(Shape);

                shape.primitive.radius += particle.sizeChange;
            }

            if(style.alpha < 0){
                world.entityManager.removeEntity(entity);
            }
        });

    }

    /* ---- EVENTS ----*/

    onSnakeEatsStar(data){

        let star = data['star'];
        let size = star.getComponent(Shape).primitive.radius;
        let starPosition =  Object.assign({}, star.getComponent(Position));
        let starStyle    =  star.getComponent(Style);

        for(let i = 0; i < 20; i++){
            world.createEntity()
            .addComponent(Shape, { type : 'circle', primitive : new Circle(Math.random() * (size / 3))})
            .addComponent(Position, { x : starPosition.x, y : starPosition.y})
            .addComponent(Style, { alpha : 1, background : starStyle.background || starStyle.border})
            .addComponent(Particle, { alphaChange : 0.01 })
            .addComponent(HasPhysics, { mass: 50 })
            .addComponent(Velocity, { 
                x : Math.sin(Math.random() * 360),
                y : Math.cos(Math.random() * 360)
            });
        }
    }

    onSnakeTeleport(data){
        let portal = data.portal;

        let portalPosition   =  portal.getComponent(Position);
        let portalStyle      =  portal.getComponent(Style).background;
        let portalDimensions =  portal.getComponent(Shape).primitive; 

        let link             =  portal.getComponent(_Portal).link;
        let linkPosition     =  link.getComponent(Position);
        let linkStyle        =  portal.getComponent(Style).background;
        let linkDimensions   =  link.getComponent(Shape).primitive;

        let portalX = portalPosition.x + portalDimensions.width / 2;
        let portalY = portalPosition.y + portalDimensions.height / 2;

        let linkX   = linkPosition.x + linkDimensions.width / 2;
        let linkY   = linkPosition.y + linkDimensions.height / 2;


        world.createEntity()
        .addComponent(Shape, { type : 'circle', primitive : new Circle(1)})
        .addComponent(Position, { x : portalX, y : portalY })
        .addComponent(Style, { alpha : 1, border : portalStyle, borderWidth: 1 })
        .addComponent(Particle, { alphaChange : 0.03, sizeChange: 4 })

        world.createEntity()
        .addComponent(Shape, { type : 'circle', primitive : new Circle(1)})
        .addComponent(Position, { x : linkX, y : linkY})
        .addComponent(Style, { alpha : 1, border : linkStyle})
        .addComponent(Particle, { alphaChange : 0.03, sizeChange: 4 })

        for(let i = 0; i < 10; i++){
            world.createEntity()
            .addComponent(Shape, { type : 'circle', primitive : new Circle( Math.random() * 3)})
            .addComponent(Position, { x : linkX, y : linkY})
            .addComponent(Style, { alpha : 1, background : linkStyle})
            .addComponent(Particle, { alphaChange : 0.02 })
            .addComponent(HasPhysics, {mass : 20})
            .addComponent(Velocity, {   
                x : Math.sin(Math.random() * 360) * 2,
                y : Math.cos(Math.random() * 360) * 2
            });
        }
    }

    onSnakeCrashesSun(data){

        let position = data.snake.getComponent(Position);

        for(let i = 0; i < 40; i++){
            world.createEntity()
            .addComponent(Shape, { type : 'circle', primitive : new Circle( Math.random() * 20)})
            .addComponent(Position, { x : position.x + Math.random() * 10, y : position.y + Math.random() * 10})
            .addComponent(Style, { alpha : 1, background : `rgb(255,${Math.random() * 160 + 50}, 80)`})
            .addComponent(Particle, { alphaChange : 0.01, sizeChange: 0.4 })
            .addComponent(HasPhysics, {mass : 70})
            .addComponent(Velocity, {   
                x : Math.sin(Math.random() * 360) * 5,
                y : Math.cos(Math.random() * 360) * 5
            });
        }
    }

}


ParticleSystem.queries = {
    particles: {
        components: [ Style, Particle ]
    }
};
