EVENT_MANAGER.addEvent('onSnakeEatsStar');
    EVENT_MANAGER.subscribeSystem('SnakeSystem',   SnakeSystem,'onSnakeEatsStar');
    EVENT_MANAGER.subscribeSystem('ParticleSystem',ParticleSystem,'onSnakeEatsStar');

EVENT_MANAGER.addEvent('onSnakeTeleport');
    EVENT_MANAGER.subscribeSystem('ParticleSystem',ParticleSystem,'onSnakeTeleport');
    EVENT_MANAGER.subscribeSystem('PortalSystem',  PortalSystem,'onSnakeTeleport');

EVENT_MANAGER.addEvent('onSnakeCrashesSun');
    EVENT_MANAGER.subscribeSystem('ParticleSystem',ParticleSystem,'onSnakeCrashesSun');
    EVENT_MANAGER.subscribeSystem('SnakeSystem',SnakeSystem,'onSnakeCrashesSun');