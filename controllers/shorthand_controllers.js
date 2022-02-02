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
	console.log("Trace: Arrived at Single Content Page");
	const contentID = req.params.contentID;
	const userID = req.params.userID;
	const direction = req.params.choice;
	console.log(contentID);
	console.log(userID);
	console.log(direction);
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
		var query_str="SELECT * from reviews where content_id='" + contentID + "' and user_id=(select user_id from users where email='" + req.session.user + "')"
		client.query(query_str, (err, resp) => {
			release()
			if (err) {
				res.render('content/contentError', {
					pageTitle: 'Matt Senior Project',
					path: '/'
				});
				return console.error('Error executing query', err.stack)
			}
			else
			{
				if(resp.rowCount==0)
				{
					//that combination doesn't exist in the DB
					console.log("No combination detected");
					//time to create a record, then!
					var insert_str = "Insert into reviews (content_id, user_id, value) values ('" + contentID + "', (select user_id from users where email='" + userID + "'), " + direction + ")"
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
						})
					})
				}
				else
				{
					if(resp.rows[0]==direction)
					{
						//No changes needed
					}
					else
					{
						//update the record
						var update_str = "Update reviews set value ="+direction+" where content_id=" + contentID + " and user_id= (select user_id from users where email='" + userID + "')"
					pool.connect((err, client, release) => {
						if (err) {
							return console.error('Error acquiring client', err.stack)
						}
						client.query(update_str, (err, resp) => {
							console.log("Updating: " + update_str);
							release()
							if (err) {
								return console.error('Error executing query', err.stack)
							}
							console.log("Database Return");
							console.log(err);
							console.log(resp);
						})
					})
					}
				}
			}
			// //console.log(resp.rows);
			// res.render('content/singleContent', {
			// 	pageTitle: 'Matt Senior Project',
			// 	path: '/',
			// 	content: resp.rows[0]
			// });
		})
	})
	return;

};