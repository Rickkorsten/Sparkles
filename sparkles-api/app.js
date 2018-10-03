const express = require('express');
const app = express();
const morgan = require('morgan');

// import routes
const userRoutes = require('./api/routes/user');
const messageRoutes = require('./api/routes/message');
const relationRoutes = require('./api/routes/relation');

app.use(morgan('dev'));

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