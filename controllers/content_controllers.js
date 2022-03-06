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



exports.getSingleContent = (req, res, next) => {
	console.log("Trace: Arrived at Single Content Page");
	const contentID = req.params.contentID;
	console.log(contentID);
	var user = req.session.user_id;
	if (!req.session.user_id) {
		user=0;
	}
	var query = {
		text: 'select * from get_single_content($1,$2)',
		values: [contentID, user]
	}

console.log(query);
pool.connect((err, client, release) => {
	if (err) {
		return console.error('Error acquiring client', err.stack)
	}

	client.query(query, (err, resp) => {
		release()
		if (err) {
			res.render('content/contentError', {
				pageTitle: 'Matt Senior Project',
				path: '/'
			});
			return console.error('Error executing query', err.stack)
		}
		console.log(resp.rows);

		res.render('content/singleContent', {
			pageTitle: 'Matt Senior Project',
			path: '/',
			content: resp.rows[0],
			user: req.session.user
		});
	})
})


};

exports.getEditContent = (req, res, next) => {
	//check for logged in and have auth
	var cid = req.params.contentID;
	console.log("Trace: Arrived at  Get Edit Content Page with a CID of " + cid);
	if (!req.session.isAdmin) {
		console.log("Attempted Access of Restricted Page. Rerouting");
		res.render('auth/getLogin', {
			pageTitle: 'Matt Senior Project',
			path: '/'
		});
		return;
	}
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from content where content_id='" + cid + "'", (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
			console.log(resp.rows[0]);
			res.render('content/editContent', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				content: resp.rows[0],
				user: req.session.user
			});
		})
	})
}
exports.postEditContent = (req, res, next) => {
	console.log("Trace: Arrived at  Post Edit Content Page");
	//check for logged in and have auth
	if (!req.session.isAdmin) {
		console.log("Attempted Access of Restricted Page. Rerouting");
		res.render('auth/getLogin', {
			pageTitle: 'Matt Senior Project',
			path: '/'
		});
		return;
	}
	var cid = req.params.contentID;
	var title = req.body.title;
	var details = req.body.details;

	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		var query = {
			text: 'call edit_content($1,$2,$3,$4)',
			values: [cid, req.session.user_id, title, details]
		}

		client.query(query, (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
		})
	})
	res.redirect('/content/' + cid)
}

exports.getSearch = (req, res, next) => {
	console.log("Trace: Arrived at  Get Search  Page");
	res.render('content/search', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
}

exports.postSearch = (req, res, next) => {
	console.log("Trace: Arrived at Post Search");
	var search = req.body.search;
	console.log("Searching for: " + search);
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from content where lower(title) like lower('%" + search + "%')", (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
			//console.log(resp.rows);
			res.render('content/searchResults', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				content: resp.rows,
				user: req.session.user
			});
		})
	})
}

exports.getViewWaves = (req, res, next) => {
	console.log("Trace: Arrived at View Waves");
	console.log();
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from wavelengths", (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
			//console.log(resp.rows);
			res.render('admin/viewWaves', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				waves: resp.rows,
				user: req.session.user
			});
		})
	})
}
exports.getRecommendations = (req, res, next) => {
	console.log("Trace: Arrived at View Recc");
	var call_str = "";
	var page_target = 'content/recommendations';
	if (req.session.user_id) {
		console.log("--User " + req.session.user_id + " found");
		call_str = "select * from get_recommendations(" + req.session.user_id + ");";
	} else {
		console.log("--No user found");
		call_str = "select * from get_recommendations(-1);";
		page_target = 'content/unloggedRecc';
	}
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query(call_str, (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
			//console.log(resp.rows);
			var wave_arr = resp.rows.filter(record => {
				return record.flag == 'wave'
			});
			var zero_arr = resp.rows.filter(record => {
				return record.flag == "zero"
			});
			//console.log(resp.rows);
			console.log(wave_arr);
			console.log(zero_arr);
			res.render(page_target, {
				pageTitle: 'Matt Senior Project',
				path: '/',
				wave_content: wave_arr,
				zero_content: zero_arr,
				user: req.session.user
			});
		})
	})
}