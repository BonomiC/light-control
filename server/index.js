var express = require('express');
var app = express();

const port = 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.post('/test', (req, res) => {
	console.log("Pressed");
	res.send("here");
});

app.listen(port, () => console.log(`Example app listening on  http://localhost:${port}`));
