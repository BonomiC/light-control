const port = process.env.PORT || '5000';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

var toggle = false;

app.get('/', (req, res) => {
	if(toggle) {
		res.send('Toggle true');
	}
	else {
		res.send('Toggle false');
	}
});

app.post('/test', (req, res) => {
	toggle = !toggle;
	console.log(req.query);
});

io.on('connection', function (socket) {
	console.log('connected:', socket.client.id);
	socket.on('serverEvent', function (data) {
		console.log('new message from client:', data);
	});
	setInterval(function () {
		socket.emit('clientEvent', Math.random());
		console.log('message sent to the clients');
	}, 3000);
});

server.listen(port, () => console.log(port));
