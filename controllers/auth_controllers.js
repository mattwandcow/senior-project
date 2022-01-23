const db = require('pg');
var connection = new db.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

exports.getLogin = (req, res, next) => {
	console.log("Trace: Arrived at Login Get Page");

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



	connection.connect();

	connection.query("SELECT * from users where email='" + email + "' limit 1", (err, resp) => {
		//		console.log(resp.rows[0].email)
		if (pass == resp.rows[0].password_hash) {
			console.log("Authenticated");
			req.session.isLoggedIn = true;
			req.session.user = email;
			connection.end()
			return req.session.save(err => {
				console.log(err);
				console.log("Saved Session");
				res.redirect('/');
			})
		} else {
			console.log("Password Mismatch?");
			connection.end();
			res.render('auth/getLogin', {
				pageTitle: 'Matt Senior Project',
				path: '/'
			});
		}

	})

};
exports.postSignup = (req, res, next) => {
	console.log("Trace: Arrived at Signup Post Page");


	var email = req.body.email;
	var pass = req.body.pass;
	var conpass = req.body.passconfirm;
	//validation stuff
	if (pass != conpass) {
		//reject?
	}

	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};