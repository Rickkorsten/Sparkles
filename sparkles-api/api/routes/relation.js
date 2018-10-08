const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/Message')
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
	// template of item to store
	const relation = new Relation({
		_id: new mongoose.Types.ObjectId(),
		first_user_id: req.body.first_user_id,
		second_user_id: req.body.second_user_id,
		start_date: new Date(),
		progress: req.body.progress,
		status: req.body.status
	})

	relation.save()
		.then(result => {
			res.status(201).json({
				message: 'Added relation succesfully!',
				relation: result
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
})
// get all messages of relation
router.get('/relation/:relation_id', (req, res, next) => {
	const relation_id = req.params.relation_id;

	Message.find({ relation_id: relation_id })
		.sort('date_send')
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

// get passed relation

// get active relation
router.get('/active_relation/:user_id', (req, res, next) => {
	const user_id = req.params.user_id;

	Relation.find()
		.or([{ first_user_id: user_id }, { second_user_id: user_id }])
		.where('status', 'active')
		.select('relation_id') // define what lines you should see in the response object
		.exec()
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



module.exports = router