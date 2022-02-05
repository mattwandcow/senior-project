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
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from content where content_id='"+contentID+"'", (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError',
				{ pageTitle: 'Matt Senior Project',
				path: '/'
			   });
				return console.error('Error executing query', err.stack)
			}
			//console.log(resp.rows);
			res.render('content/singleContent', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				content: resp.rows[0],
				user: req.session.user
			});
		})
	})


};

exports.getSearch = (req, res, next) => {
	res.render('content/search',
	{ pageTitle: 'Matt Senior Project',
	path: '/'
   });
}

exports.postSearch = (req, res, next) => {
	var search = req.body.search;
	console.log("Searching for: "+search);
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		client.query("SELECT * from content where lower(title) like lower('%"+search+"%')", (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError',
				{ pageTitle: 'Matt Senior Project',
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