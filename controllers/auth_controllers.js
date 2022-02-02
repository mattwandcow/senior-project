const session = require('express-session');

const {
	Pool
} = require('pg');

var pool = new Pool({
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
exports.getLogout = (req, res, next) => {
	console.log("Trace: Arrived at Login Get Page");
	req.session.destroy(err => {
		console.log("if there's an err from controllers/auth.js 'postLogout', here it is -> ", err); // logs error if we get one.
		console.log("You have been logged out by the controllers/auth.js 'postLogout' function!");
		res.redirect('/'); // after destroying the session we are redirected back to the '/' page.
	})
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

	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from users where email='" + email + "' limit 1", (err, resp) => {
			release()
			if (err) {
				return console.error('Error executing query', err.stack)
			}
			//need to add some checks to make sure there is a row returned?
			if (pass == resp.rows[0].password_hash) {
				console.log("Authenticated");
				req.session.isLoggedIn = true;
				if (resp.rows[0].access == 1) //isAdmin
					req.session.isAdmin = true;
				else
					req.session.isAdmin = false;
				req.session.user = email;

				return req.session.save(err => {
					console.log("Session Save Error:"+err);
					console.log("Saved Session");
					res.redirect('/');
				})
			} else {
				console.log("Password Mismatch?");
				res.render('auth/getLogin', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
			}
		})
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
exports.getAdmin = (req, res, next) => {
	console.log("Trace: Arrived at Admin Page");

	res.render('admin/index', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.getAddContent = (req, res, next) => {
	console.log("Trace: Arrived at Add Content Page");

	res.render('admin/addContent', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.postAddContent = (req, res, next) => {
	console.log("Trace: Arrived at Post Add Content");
	var insert_str = "Insert into content (title, created_by, updated_by) values ('" + req.body.title + "', (select user_id from users where email='" + req.session.user + "'), (select user_id from users where email='" + req.session.user + "'))"
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query(insert_str, (err, resp) => {
			console.log("Inserting: " + insert_str);
			release()
			if (err) {
				return console.error('Error executing query', err.stack)
			}
			console.log("Database Return");
			console.log(err);
			console.log(resp);
			console.log("Redirecting to Add Content");
			res.redirect('/admin/add-content');
		})
	})

};
exports.getViewContent = (req, res, next) => {
	console.log("Trace: Arrived at View Content");
	//console.log(req.locals);

	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from content", (err, resp) => {
			release()
			if (err) {
				return console.error('Error executing query', err.stack)
			}
			//console.log(resp.rows);
			res.render('admin/viewContent', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				content: resp.rows
			});
		})
	})

};