const port = process.env.PORT || '5000';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(express.json());
app.use(cors());

var toggle = false;
var socketConnected = false;

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
	if(socketConnected) {
		io.emit('message', JSON.stringify(req.body));
	}
	res.send(req.body);
});

app.post('/red', (req, res) => {
	let data = {
		mode: 'solid',
		r: 255,
		g: 0,
		b: 0
	};

	if(socketConnected) {
		io.emit('message', JSON.stringify(data));
	}
	res.send(data);
});

app.post('/off', (req, res) => {
	let data = {
		mode: 'off'
	};

	if(socketConnected) {
		io.emit('message', JSON.stringify(data));
	}
});

io.on('connection', function(socket) {
	socketConnected = true;

	socket.on('disconnect', () => {
		socketConnected = false;
	});
});

server.listen(port, () => console.log(port));
