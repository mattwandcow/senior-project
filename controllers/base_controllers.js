const {
	Pool
} = require('pg');

var pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

exports.getLanding = (req, res, next) => {
	console.log("Trace: Arrived at Landing Page");
	if (res.locals.user_id) {
		console.log("Logged in with ID of: " + res.locals.user_id);
		pool.connect((err, client, release) => {
			if (err) {
				return console.error('Error acquiring client', err.stack)
			}
			client.query("select * from get_review_bait("+res.locals.user_id+")", (err, resp) => {
				release()
				if (err) {
					return console.error('Error executing query', err.stack)
				}
				if (resp.rowCount == 0) {
					//uh... all movies reviewed, i guess? or delayed
				} else {
					//rock on.
					res.render('base/landing', {
						pageTitle: 'Matt Senior Project',
						path: '/',
						user: res.locals.email,
						content: resp.rows
					});
				}
			})
		})
	} else {

		console.log("Not logged in");
		res.render('base/landing', {
			pageTitle: 'Matt Senior Project',
			path: '/',
			content: "blank"
		});
	}
};
exports.getAbout = (req, res, next) => {
	console.log("Trace: Arrived at About Page");
	res.render('base/about', {
		pageTitle: 'Matt Senior Project',
		path: '/',
		isAuthenticated: req.session.isLoggedIn
	});
};
exports.getToDo = (req, res, next) => {
	console.log("Trace: Arrived at Todo Page");
	res.render('base/todo', {
		pageTitle: 'Project Todo List',
		path: '/',
		isAuthenticated: req.session.isLoggedIn
	});
};