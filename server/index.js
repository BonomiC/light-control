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
		io.emit('message', JSON.stringify(req.query));
	}
	res.send(req.query);
});

io.on('connection', function(socket) {
	socketConnected = true;

	// console.log('connected:', socket.client.id);
	// socket.on('serverEvent', function(data) {
	// 	console.log('new message from client:', data);
	// });

	socket.on('disconnect', () => {
		socketConnected = false
	});
});

server.listen(port, () => console.log(port));
