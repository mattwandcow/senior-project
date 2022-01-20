/********* This is the Base Controller  **************/

exports.getLanding = (req, res, next) => {
	console.log("Trace: Arrived at Landing Page");
	res.render('base/landing',
	{ pageTitle: 'Matt Senior Project',
	path: '/'
   });
};
exports.getAbout = (req, res, next) => {
	console.log("Trace: Arrived at About Page");
	res.render('base/about',
	{ pageTitle: 'Matt Senior Project',
	path: '/'
   });
};