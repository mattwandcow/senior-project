const url = require('url');

/********* This is the Error Controller  **************/

exports.get404 = (req, res, next) => {
	console.log("Trace: Arrived at 404 Page");
	var url_str=url.format({
		protocol: req.protocol,
		host: req.get('host'),
		pathname: req.originalUrl,
	});
	console.log("--Attempted Path: "+url_str);
	res.status(404).render('404', {
		pageTitle: '404 Page Not Found',
		path: '/404'
	});
};

exports.get500 = (req, res, next) => {
	console.log("Trace: Arrived at 500 Page");
	res.status(500).render('500', {
		pageTitle: '500 Internal Server Error',
		path: '/500'
	});
};