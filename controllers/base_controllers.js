/********* This is the Base Controller  **************/

exports.getLanding = (req, res, next) => {
	console.log("Trace: Arrived at Landing Page");
	// console.log(req.session);
	// console.log(res.locals);
	res.render('base/landing',
	{ pageTitle: 'Matt Senior Project',
	path: '/'
   });
};
exports.getAbout = (req, res, next) => {
	console.log("Trace: Arrived at About Page");
	res.render('base/about',
	{ pageTitle: 'Matt Senior Project',
	path: '/', 
    isAuthenticated: req.session.isLoggedIn
   });
};
exports.getToDo = (req, res, next) => {
	console.log("Trace: Arrived at Todo Page");
	res.render('base/todo',
	{ pageTitle: 'Project Todo List',
	path: '/', 
    isAuthenticated: req.session.isLoggedIn
   });
};