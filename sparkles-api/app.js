// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: (process.env.TURBO_ENV=='dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		},
		onSuccess: () => {
			console.log('DB Successfully Connected!')
		}
	}
}

const app = vertex.app(config) // initialize app with config options

// import routes
const index = require('./routes/index')
const user = require('./routes/user')
const message = require('./routes/message')
const relation = require('./routes/relation')

// set routes
app.use('/', index)
app.use('/api', user) // user route
app.use('/api', message) // message route
app.use('/api', relation) // message route


module.exports = app