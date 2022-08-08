class EventManager {
    constructor(world){
        this.world  = world;
        this.events = {};

    }


    addEvent(eventName){
        if(this.events[eventName]){
            return;
        } 
        this.events[eventName] = {};
    }


    subscribeSystem(systemName, system , eventName){

        if(!this.events[eventName]){
            throw Error(`Cannot subscribe ${systemName} to '${eventName}', because the event does not exist`);
        }

        this.events[eventName][systemName] = system;
    }


    notify(data, eventName){
        var observers = this.events[eventName]
        // We dynamically call the function associated to the event. We do this for all systems subscribed to the event

        Object.keys(observers).forEach(key => {
            //console.log(observers[key]['onSnakeTeleport']);
            this.world.getSystem(observers[key])[`${eventName}`](data);
        });
    }

}