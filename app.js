const path = require('path'); // for getting project directory path
const http = require('http'); // imported for creating a server

const express = require('express');
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000; //Run on Port variable, or 5000

//what do these do again
const bodyParser = require('body-parser');

/* ##Cors Stuff
const cors = require('cors');
const corsOptions = {
	origin: "https://cse341-g4.herokuapp.com/",
	optionsSuccessStatus: 200
  };
//*/

//const flash = require('connect-flash'); //this is a message box library

//const csrf = require('csurf');
//const csrfProtection = csrf();

//## need to figure out the databases soon
const app = express();

app.use(
	session({
		secret: 'wavelength',
		resave: false,
		saveUninitialized: false,
		cookie: {
		//	secure: true //when using local host, this is broken. Recommended for https pages, tho
		secure: false
		}
	})
)

app.use((req, res, next) => {
	// Used for user authentication. Can reuse later.
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.isAdmin = req.session.isAdmin;
	//res.locals.csrfToken = req.csrfToken();
	next();
});

app.set('view engine', 'ejs'); // change based on engine: pug, hbs, ejs
app.set('views', 'views'); // default where to find templates

//##Cors
//app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
// Line says "If we have a request that starts with '/images' THEN serve it using the 'static' method." 
//		We use the 'static' method as described in the notes above to make our 'images' folder a public folder 
//		that people can read-only access.

const Options = {
	useUnifiedTopology: true,
	useNewURLParser: true,
	family: 4
};

//app.use(csrfProtection); // We now add our Cross-Site Request Forgery (csrf) protection. Must be enabled after the session is set


const errorController = require('./controllers/errors');
const adminRoutes = require('./routes/admin_routes')
const authRoutes = require('./routes/auth_routes')
const baseRoutes = require('./routes/base_routes')
const contentRoutes = require('./routes/content_routes')
const shorthandRoutes = require('./routes/shorthand_routes')

app.use('/db', async (req, res) => {
	try {
		const client = await pg_pool.connect();
		const result = await client.query('SELECT * FROM test_table');
		const results = {
			'results': (result) ? result.rows : null
		};
		res.render('base/db', results);
		client.release();
	} catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
})
app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(baseRoutes);
app.use(contentRoutes);
app.use(shorthandRoutes);
app.use(errorController.get404);
app.use(errorController.get500);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));