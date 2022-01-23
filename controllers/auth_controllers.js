const db = require('../db');

exports.getLogin = (req, res, next) => {
	console.log("Trace: Arrived at Login Get Page");
	
	const db = require('pg');
	var connection= new db.Client({
		connectionString: process.env.DATABASE_URL,
		// host:		process.env.DATABASE_HOST,
		// user:		process.env.DATABASE_USER,
		// password: 	process.env.DATABASE_PASS,
		// database: 	process.env.DATABASE_NAME,
		// port:		process.env.DATABASE_PORT,
		ssl: {
			rejectUnauthorized: false
		  }
	});
	
	connection.connect();
	
	connection.query('SELECT NOW()', (err, res) => {
		console.log(err, res)
		connection.end()
	  })
	//connection.end();
	

	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.getSignup = (req, res, next) => {
	console.log("Trace: Arrived at Sign Get Page");
	res.render('auth/getSignup', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.postLogin = (req, res, next) => {
	console.log("Trace: Arrived at Login Post Page");
	var email = req.body.email;
	var pass = req.body.pass;
	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.postSignup = (req, res, next) => {
	console.log("Trace: Arrived at Signup Post Page");


	var email = req.body.email;
	var pass = req.body.pass;
	var conpass = req.body.passconfirm;
	//validation stuff
	if(pass!=conpass)
	{
		//reject?
	}
	
	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};