const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import routes
const userRoutes = require('./api/routes/user');
const messageRoutes = require('./api/routes/message');
const relationRoutes = require('./api/routes/relation');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers', 
		'Origin, X-Requested-with, Content-type, Accept, Authorization' 
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({})
	}
	next();
});

// set routes
app.use('/user', userRoutes); // user route 
app.use('/message', messageRoutes); // message route
app.use('/relation', relationRoutes); // message route

app.use((req, res, next) => {
	const error = new Error('Not found!!!');
	error.status(404);
	next(error);
})

app.use((error, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})

module.exports = app