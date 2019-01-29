var io = require('socket.io-client');
var socket = io.connect("https://node-server-test.now.sh", {
    reconnection: true
});

// var socket = io.connect("http://localhost:5000", {
    // reconnection: true
// });

socket.on('connect', () => {
	console.log('Connected to server!');
});

socket.once('connect', function () {
    socket.on('message', function (data) {
        console.log('message from the server:', JSON.parse(data));
        // socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
    });
});
