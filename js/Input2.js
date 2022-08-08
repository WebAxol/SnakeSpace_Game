

const Input = {

    keypressed : null,
	
    reset: function () {
            this.keypressed = null;
    }
}

window.addEventListener('keydown', (e) => {
    Input.keypressed = e.key;
});