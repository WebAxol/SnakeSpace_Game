

class Composite extends Component {}

Composite.schema = {
    items : { type : Types.Array }
}


/*-----------------------------Style and Geometry-------------------------- */

class Shape extends Component {}

Shape.schema = {
    type      : { type : Types.String },
    primitive : { type : Types.JSON }
};

class Style extends Component {}

Style.schema = {
    background : { type : Types.String },
    border     : { type : Types.String },
    borderWidth: { type : Types.Number },
    alpha      : { type : Types.Number, default : 1},
    alphaDie   : { type:  Types.Number, default : 0}
}

class Sense extends Component {}

Sense.schema = {
    x : { type : Types.Number },
    y : { type : Types.Number }
}

/*-------------------------Forces and Motion------------------------------ */

class Forcefield extends Component {}

Forcefield.schema = {
    force  : { type : Types.Number },
    field  : { type : Types.Number }
}

class HasPhysics extends  Component {}

HasPhysics.schema = {
    mass : { type : Types.Number, default : 1 }
}

class Position extends Component {}

Position.schema = {
    x : { type : Types.Number },
    y : { type : Types.Number }
};

class Acceleration extends Component {}

Acceleration.schema = {
    x : { type : Types.Number},
    y : { type : Types.Number}
};

class Velocity extends Component {}

Velocity.schema = {
    x : { type : Types.Number },
    y : { type : Types.Number }
};


/*---------------------------Functional---------------------------------*/

class _Portal extends Component {}

_Portal.schema = {
    link : { type : Types.JSON }
}

class Particle extends Component {}

Particle.schema = {
    sizeChange  : { type : Types.Number },
    alphaChange : { type : Types.Number }
}

/*-------------------------Classifyiers------------------------------ */

class _Snake extends Component {}

_Snake.schema = {
    alive: { type : Types.Boolean, default: true}
}

class _Star  extends TagComponent {}