const express = require('express');
const router = express.Router()

const Relation = require('../models/Relation');

router.get('/', (req, res, next) => {

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
router.get('/:id', (req, res, next) => {
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

// router.get('/:id/message', (req, res, next) => {
// 	const id = req.params.id

// 	Relation.findById(id).where()
// 	.then(relation => {
// 		res.json({
// 			confirmation: 'succes',
// 			data: relation
// 		})
// 	})
// 	.catch(err => {
// 		res.json({
// 			confirmation: 'mislukt',
// 			data: 'relation with ' + id + ' not found.'
// 		})
// 	})
// })



module.exports = router