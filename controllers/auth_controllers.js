/********* This is the Base Controller  **************/

exports.getLogin = (req, res, next) => {
	console.log("Trace: Arrived at Login Get Page");
	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.getSignup = (req, res, next) => {
	console.log("Trace: Arrived at Sign Get Page");
	res.render('auth/getSignup', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.postLogin = (req, res, next) => {
	console.log("Trace: Arrived at Login Post Page");
	var email = req.body.email;
	var pass = req.body.pass;
	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};
exports.postSignup = (req, res, next) => {
	console.log("Trace: Arrived at Signup Post Page");
	var email = req.body.email;
	var pass = req.body.pass;
	var conpass = req.body.passconfirm;
	//validation stuff
	if(pass!=conpass)
	{
		//reject?
	}
	
	res.render('auth/getLogin', {
		pageTitle: 'Matt Senior Project',
		path: '/'
	});
};