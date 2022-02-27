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

exports.getAddImage = (req, res, next) => {
	console.log("Trace: Arrived at Add Image Page");
	var cid=req.params.contentID;
	console.log(cid);

	
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
			res.render('admin/addImage', {
				pageTitle: 'Matt Senior Project',
				path: '/',
				content: resp.rows[0],
				user: req.session.user
			});
		})
	})

}
exports.postAddImage = (req, res, next) => {
	console.log("Trace: Arrived at Post Image Page");
	var cid=req.params.contentID;
	console.log(req.file);
	var message=req.file.filename;
	var query_str="call register_image("+cid+", '"+message+"', "+res.locals.user_id+")";
	console.log(query_str);
	pool.connect((err, client, release) => {
		if (err) {
			return console.error('Error acquiring client', err.stack)
		}
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
	res.redirect('/content/'+cid)
}