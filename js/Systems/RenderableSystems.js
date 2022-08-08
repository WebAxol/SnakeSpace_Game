

/*------ Renderer System-----*/


class RendererSystem extends System {

    execute( delta,time ){
        this.queries.renderables.results.forEach( entity => {

            let shape = entity.getComponent(Shape);
            let type  = shape.type;

            let params = [
                entity.getComponent(Position),
                shape.primitive,
                entity.getComponent(Style)
            ];

            switch( type ){
                case 'circle' : this.Circle( ...params);
                break;
                case 'box' : this.Box(...params);
                break;
                case 'polygon' : this.Polygon(...params);
                break;
                default:   throw Error(`Invalid shape type '${type}' at Entity ${entity.id}`);
            }

        });
    }

    border(style){

        if(style.border != ""){
            c.strokeStyle = style.border;
            c.lineWidth = style.borderWidth | 0;
            c.stroke();
        }
    }

    /*--Circle--*/

    Circle( pos, circle, style ){

        c.globalAlpha = style.alpha;
        c.beginPath();
        c.arc( pos.x, pos.y, Math.abs(circle.radius),0, 2 * Math.PI);


        if(style.background){
            c.fillStyle = style.background;
            c.fill();
        }

        this.border(style)

        c.closePath();
        c.globalAlpha = 1;

    }

    /*--Box--*/

    Box( pos, box, style ){
        
        if(style.background){

            c.globalAlpha = style.alpha;
            c.fillStyle = style.background;
            c.fillRect(
                pos.x, pos.y,
                box.width, box.height
            );
        }
        c.beginPath();

        this.border(style);
    }

    /*--Polygon--*/

    Polygon( pos, polygon, style){

        c.beginPath();
        c.globalAlpha = style.alpha;
        c.lineWidth = style.borderWidth | 2;    


        let x = pos.x + polygon.vertices[0].x;
        let y = pos.y + polygon.vertices[0].y;


        c.lineTo(x,y);

        for(let i = 1; i < polygon.vertices.length; i++){
            
            let x = pos.x + polygon.vertices[i].x;
            let y = pos.y + polygon.vertices[i].y;

            c.lineTo(x,y);
        }

        console.log(polygon)
        //Close Polygon
        c.lineTo(x,y);


        if(style.background){
            c.fillStyle = style.background;
            c.fill();
        }

        this.border(style);

        c.closePath();

    }
}

//Queries

RendererSystem.queries = {
    renderables: {
        components: [Shape, Position, Style]
    }
};