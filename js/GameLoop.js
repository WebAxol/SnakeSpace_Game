
/*-- GameLoop --*/

var pause = false;

function run() {

    requestAnimationFrame(run);

    if(pause){
        return;
    }

    c.fillStyle = 'rgba(6,14,22,0.4)';
    //c.fillStyle = 'rgba(15,0,5,0.3)';
    c.fillRect(0,0, canvasWidth,canvasHeight);
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;

    // Run all the systems
    world.execute(delta, time);
    Input.reset();

    lastTime = time;
}

var lastTime = performance.now();


c.fillStyle = 'blue';
c.fillRect(0,0, canvasWidth,canvasHeight);


run();

window.addEventListener('dblclick', () => {
    pause =  !pause;
});