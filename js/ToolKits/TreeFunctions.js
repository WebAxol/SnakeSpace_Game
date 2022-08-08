
class Tree {

    static addEntity(composite, entity){

        if(composite.hasComponent(Composite)){

            if(entity.parent){
                /*
                    Explanation: Entities, can only belong to one composite entity,
                    otherwise, we would have troubles when, deleting the entity.
                */
                throw Error(`The entity is already part of a tree`);
            }
            else{
                let arr = composite.getMutableComponent(Composite);
                entity.parent = composite;
                arr.items.push(entity);
            }
        }else{
            throw Error(`Cannot add entity to a non-tree structure`)
        }
    }

    static removeEntity(composite, entity){

        if(composite.hasComponent(Composite)){

            let arr = composite.getMutableComponent(Composite);
            let index =  arr.items.indexOf(entity);
            arr.items.splice(index,0,1);

        }else{
            throw Error(`Cannot remove entity from a non-tree structure`)
        }
    }

    static last(composite){
        
        if(composite.hasComponent(Composite)){

            let items = composite.getComponent(Composite).items;
            return items[items.length - 1];

        }else{
            throw Error(`Cannot get node from a non-tree structure`)
        }
    }

    /* 
        When Composite entity is deleted, all its child entities, are deleted.
        Recursion is used, to ensure that all entities are deleted, including grandchild nodes.

        Entities are not only deleted from the tree, but also from the entityManager.
    */

    static delete(composite){

        if(composite.hasComponent(Composite)){

            let arr = composite.getMutableComponent(Composite).items;
            
            for(let i = 0; i < arr.length;){
                //this.delete(arr[i]);
                composite._entityManager.removeEntity(arr[i]);
                arr.shift();

            }

        }else{
            composite.entityManager.removeEntity(composite);
        }
    }
}