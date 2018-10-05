const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Relation = require('../models/Relation');

router.get('/', (req, res, next) => {

	Relation.find()
		.then(relation => {
			res.status(200).json({
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

router.post('/', (req, res, next) => {
	const relation = new Relation({
		_id: mongoose.Types.ObjectId(),
		first_user_id: req.body.first_user_id,
		second_user_id: req.body.second_user_id,
		start_date: new Date(),
		progress: req.body.progress,
		status: req.body.status,
		messages: req.body.messages,
	})
	relation.save()
	.exec()
	.then(result => {
		console.log(result);
		res.status(201).json(result)
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({
			error: err
		})
	})
})

// // get profile with id
// router.get('/:id', (req, res, next) => {
// 	const id = req.params.id

// 	Relation.findById(id)
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