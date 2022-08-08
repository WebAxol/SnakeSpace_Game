class CollisionDetector{

    static onRange( point1, point2, range){
        let position1 = point1.getComponent(Position);
        let position2 = point2.getComponent(Position);
        let delta = Vector2D.sub(position1,position2);
        return Vector2D.magSq(delta) <= range * range ? delta : false; 
    }

    static pointInCircle(point, circle){
        let shape = circle.getComponent(Shape);
        let position =  circle.getComponent(Position);
        let centerToPoint = Vector2D.sub(point,position);

        return Vector2D.magSq(centerToPoint) <= shape.primitive.radius * shape.primitive.radius;
    };

    static CircleVsCircle(circle1,circle2){

        let c1 = circle1.getComponent(Shape);
        let p1 = circle1.getComponent(Position)

        let c2 = circle2.getComponent(Shape);
        let p2 = circle2.getComponent(Position)

        let delta = Vector2D.sub(p1,p2);

        return Vector2D.magSq(delta) <= (c1.primitive.radius + c2.primitive.radius) *  (c1.primitive.radius + c2.primitive.radius) ? delta : false;
    }

    static pointInBox(point, box){
        let shape = box.getComponent(Shape);
        let min = box.getComponent(Position)

        return  (point.x >= min.x && min.x + shape.primitive.width  >= point.x ||  
                point.x <= min.x && min.x + shape.primitive.width  <= point.x) &&
                (point.y >= min.y && min.y + shape.primitive.height >= point.y ||
                point.y <= min.y && min.y + shape.primitive.height <= point.y
                );
    };

    static BoxVsBox(box1,box2){

        let p1 = box1.getComponent(Position);
        let s1 = box1.getComponent(Shape);

        let p2 = box2.getComponent(Position)  
        let s2 = box2.getComponent(Shape); 

        return ( p1.x + s1.primitive.width  > p2.x && p1.x < p2.x + s2.primitive.width 
            &&   p1.y + s1.primitive.height > p2.y && p1.y < p2.y + s2.primitive.height)
        
    }
}