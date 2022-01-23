const { Pool} = require('pg')

const pool = new Pool({
	// host: process.env.DATABASE_URL,
	// database: process.env.DATABASE_NAME,
	// user: process.env.DATABASE_USER,
	// password: process.env.DATABASE_PASSWORD,
	// port: 5432
	host: 'ec2-52-45-83-163.compute-1.amazonaws.com',
	database: 'd7q91epbpp9sic',
	user: 'wqlmbmlpknjszf',
	password: '4001e3e096ee0f266d53bcfd27402dc9e5176b5e629a7ef70e85db199ba63ebd',
	port: 5432

})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}