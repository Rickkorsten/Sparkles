const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const User = require('../models/Message');

router.post('/user', (req, res) =>{

	User.create(req.body)
	.then(user => {
		res.json({
			confirmation: 'succes',
			data: user
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})
})