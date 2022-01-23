const db = require('pg')

const connection = new db.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
})

module.exports = {
	query: (text, params, callback) => {
		connection.connect();
		return connection.query(text, params, callback)
}
}