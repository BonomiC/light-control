var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.post('/test', (req, res) => {
	console.log('Pressed');
	// console.log(req);
	res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));
