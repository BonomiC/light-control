const io = require('socket.io-client');
const socket = io.connect("https://node-server-test.now.sh", {
	reconnection: true
});
const GPIO = require('pigpio').Gpio;

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

const red = new GPIO(26, {mode: GPIO.OUTPUT});
const green = new GPIO(19, {mode: GPIO.OUTPUT});
const blue = new GPIO(13, {mode: GPIO.OUTPUT});

var currentMode = Mode.OFF;

var lightData;

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.once('connect', function () {
	socket.on('message', function (data) {
		lightData = JSON.parse(data);
		console.log('Message from the server:', lightData);

		parseMode(lightData);
		console.log(Object.keys(Mode).filter(function(key) {return Mode[key] === currentMode})[0]);

		// if(lightData.colors) {
		// 	console.log('Number of colors:', lightData.colors.length);
		// }
	});
});

function parseMode(data) {
	switch(data.mode) {
		case "off":
			currentMode = Mode.OFF;
			break;
		case "solid":
			currentMode = Mode.SOLID;
			break;
		case "cycle":
			currentMode = Mode.CYCLE
			break;
		case "fade":
			currentMode = Mode.FADE;
			break;
		case "blink":
			currentMode = Mode.BLINK;
			break;
	}
}

function off() {

}