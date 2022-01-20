/********* This is the Error Controller  **************/

exports.get404 = (req, res, next) => {
	console.log("Trace: Arrived at 404 Page");
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