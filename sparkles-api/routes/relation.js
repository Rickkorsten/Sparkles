const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Relation = require('../models/Relation');

router.get('/relation', (req, res) => {

	Relation.find()
	.then(relation => {
		res.json({
			confirmation: 'gelukt',
			data: relation
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})

})

// get profile with id
router.get('/relation/:id', (req, res) => {
	const id = req.params.id

	Relation.findById(id)
	.then(relation => {
		res.json({
			confirmation: 'succes',
			data: relation
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: 'relation with ' + id + ' not found.'
		})
	})
})

router.get('/relation/:id/message', (req, res) => {
	const id = req.params.id

	Relation.findById(id).where()
	.then(relation => {
		res.json({
			confirmation: 'succes',
			data: relation
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: 'relation with ' + id + ' not found.'
		})
	})
})



module.exports = router