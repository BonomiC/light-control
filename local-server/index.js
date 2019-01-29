var io = require('socket.io-client');
var socket = io.connect("https://node-server-test.now.sh", {
	reconnection: true
});

// var socket = io.connect("http://localhost:5000", {
// reconnection: true
// });

var lightData;

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.once('connect', function () {
	socket.on('message', function (data) {
		lightData = JSON.parse(data);
		console.log('Message from the server:', lightData);

		if(lightData.colors) {
			console.log('Number of colors:', lightData.colors.length);
		}
	});
});
