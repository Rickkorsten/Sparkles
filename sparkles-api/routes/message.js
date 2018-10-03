const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Message = require('../models/Message');

router.get('/message', (req, res) => {

	Message.find()
	.then(message => {
		res.json({
			confirmation: 'gelukt',
			data: message
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})

})

router.post('/message', (req, res) =>{

	Message.create(req.body)
	.then(message => {
		res.json({
			confirmation: 'succes',
			data: message
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})
})

module.exports = router