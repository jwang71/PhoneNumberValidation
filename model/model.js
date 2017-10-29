const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:',(err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS phoneNumbers (phone_number text primary key)');
});

class PhoneNumber {
	constructor(phoneNumber){
		this.phoneNumber = phoneNumber;
	}

	static all(callback){
		db.all('SELECT * FROM phoneNumbers', callback);
	};

	static add(phoneNumber){
		const sql = 'INSERT INTO phoneNumbers(phone_number) VALUES(?)';
		db.run(sql, phoneNumber);
	};
}

module.exports = PhoneNumber;
