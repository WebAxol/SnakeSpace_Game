
/*-----------Box----------*/


class Box {

    constructor(width, height){

        this.width = width;
        this.height = height;

    }
}


/*----------Circle---------*/


class Circle {

    constructor(radius){

        this.radius = radius;

    }
}

/*-----Regular Polygon-----*/


class RegularPolygon {

    constructor(radius, sides, rotation = 0){

        if(sides < 3){
            throw Error("Cannot create polygon with less than 3 sides");
        }
        else{
            this.radius = radius;
            this.sides  = sides;
            this.rotation = rotation;
            this.vertices = this.getVertices();
        }
    }

    getVertices(){
        var vertices = [];

        for(let i = 1; i <= this.sides; i++){

            let angle =  i * (360 / this.sides) + this.rotation - 45;
            //From radians to degree
            angle *= (Math.PI / 180);

            vertices.push({ 

                x : Math.cos(angle) * this.radius,
                y : Math.sin(angle) * this.radius

            });
        }

        return vertices;
    }
}


/*----- Twisted Star -----*/


class TwistStar extends RegularPolygon {

    constructor(radius, sides, rotation = 0){

        if(sides < 3){ throw Error("Cannot create twisted star with less than 3 sides"); }

        if(sides % 2 == 0){ throw Error("Cannot create star with an even number of points") }

        else{
            super(radius, sides, rotation);
        }
    }
    getVertices(){
        var vertices = [];
        for(let i = 1; i <= this.sides; i++){
            let angle =  i * (360 / this.sides) + this.rotation - 45;
            //From radians to degree
            angle *= (Math.PI / 180);

            vertices.push({ 
                x : Math.cos(angle * (this.sides - 1) / 2) * this.radius,
                y : Math.sin(angle * (this.sides - 1) / 2) * this.radius
            });
        }
        return vertices;
    }
}


/*------ Star -----*/


class Star extends RegularPolygon {

    constructor(radius, sides, center, rotation = 0){

        if(sides < 3){ throw Error("Cannot create star with less than 3 points"); }

        else{
            super(radius, sides, rotation);
            this.sub = center;
        }
    }
    getVertices(){
        var vertices = [];
        for(let i = 1; i <= (this.sides * 2); i++){

            let angle =  i * (360 / (this.sides * 2)) + this.rotation;
            //From radians to degree
            angle *= (Math.PI / 180);

            var distance;

            if(i % 2 == 0){
                distance = this.radius / 2;
            }else{
                distance = this.radius;
            }

            vertices.push({ 
                x : Math.cos(angle) * distance,
                y : Math.sin(angle) * distance
            });
        }
        return vertices;
    }
}