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

exports.logReview = (req, res, next) => {
	console.log("Trace: Shorthand Log Review Page");
	const contentID = req.params.contentID;
	const userID = res.locals.user_id;
	const direction = req.params.choice;
	console.log(contentID);
	console.log(userID);
	console.log(direction);
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		var query_str="call process_review("+contentID+","+userID+","+direction+")";
		console.log(query_str);
		client.query(query_str, (err, resp) => {
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
	return; 

};