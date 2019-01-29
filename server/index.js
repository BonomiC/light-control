var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.post('/test', (req, res) => {
	console.log(req.query);
	res.send(req.query);
});

app.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));
