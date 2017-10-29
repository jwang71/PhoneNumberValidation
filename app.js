const express = require('express');
const http = require('http');
const port = 3000;
const app = express();
const phoneNumber = require('./model/model');
const bodyParser = require('body-parser');


const accountSid = 'ACef639515acada0680a7e28439b3ad0c4';
const authToken = 'cb8d71b624b2da1e6587dc7577467d3e';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/', function(req, res) {
	client.lookups.v1.phoneNumbers(req.body.phoneNumber).fetch().then((data) => {
		phoneNumber.add(data.phoneNumber);
		res.status(200).json(data.phoneNumber.slice(1));
	}).catch(error => {
		console.log(error);
		res.status(500).json('Invalid data')
	});
});

app.get('/', function(req, res) {
	phoneNumber.all((err, phoneNumbers) => {
		let result = phoneNumbers.map( obj => obj.phone_number.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1-($2)-$3-$4').replace(/\+/g, ""));
		res.status(200).json(result);
	});
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
	console.log('Listening to port: ' + port);
});
