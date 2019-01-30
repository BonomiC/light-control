const io = require('socket.io-client');
const socket = io.connect("https://node-server-test.now.sh", {
	reconnection: true
});
// const GPIO = require('pigpio').Gpio;

// var socket = io.connect("http://localhost:5000", {
// reconnection: true
// });

const Mode = {
	OFF: 1,
	SOLID: 2,
	CYCLE: 3,
	FADE: 4,
	BLINK: 5
}

// const red = new GPIO(26, {mode: GPIO.OUTPUT});
// const green = new GPIO(19, {mode: GPIO.OUTPUT});
// const blue = new GPIO(13, {mode: GPIO.OUTPUT});

var currentState = {
	mode: Mode.OFF,
	colors: [{
		r: 0,
		b: 0,
		g: 0
	}],
	currentColor: 0
};

var loop;

var prevMode = currentState.mode;

control();

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.once('connect', function () {
	socket.on('message', function (data) {
		lightData = JSON.parse(data);
		console.log('Message from the server:', lightData);

		parseData(JSON.parse(data));

		if(currentState.mode != prevMode) {
			console.log('control');
			control();
		}
		prevMode = currentState.mode;
		// console.log(Object.keys(Mode).filter(function(key) {return Mode[key] === currentState.mode})[0]);
	});
});

function parseData(data) {
	switch(data.mode) {
		case "off":
			currentState.mode = Mode.OFF;
			break;
		case "solid":
			currentState.mode = Mode.SOLID;
			break;
		case "cycle":
			currentState.mode = Mode.CYCLE
			break;
		case "fade":
			currentState.mode = Mode.FADE;
			break;
		case "blink":
			currentState.mode = Mode.BLINK;
			break;
	}

	if(data.colors) {
		currentState.colors = data.colors;
	}
	currentState.currentColor = 0;
}

function off() {
	currentState.colors = [{
		r: 0,
		g: 0,
		b: 0
	}];

	return setInterval(() => {
		// console.log('OFF');
		console.log(currentState);
		// red.pwmWrite(0);
		// green.pwmWrite(0);
		// blue.pwmWrite(0);
	}, 500);
}

function solid() {
	return setInterval(() => {
		// console.log('SOLID');
		console.log(currentState);
		// red.pwmWrite(currentState.colors[0].r);
		// green.pwmWrite(currentState.colors[0].g);
		// blue.pwmWrite(currentState.colors[0].b);
	}, 500);
}

function control() {
	clearInterval(loop);

	switch(currentState.mode) {
		case Mode.OFF:
			loop = off();
			break;
		case Mode.SOLID:
			loop = solid();
			break;
	}
}
