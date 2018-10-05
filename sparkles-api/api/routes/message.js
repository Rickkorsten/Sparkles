const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/Message');


router.get('/', (req, res, next) => {

	Message.find()
		.select('_id sender message date_send relation_id') // define what lines you should see in the response object
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				messages: docs.map(doc => { // structure the output of the response and add it the way tom en me like <3
					return {
						sender: doc.sender,
						message: doc.message,
						date_send: doc.date_send,
						relation_id: doc.relation_id,
						_id: doc._id,
						request: {
							type: 'get',
							description: 'GET_THIS_MESSAGES',
							url: 'http://localhost:3000/message/' + doc._id,
						}
					}
				})
			}
			res.status(200).json(response)
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		})

})

router.post('/', (req, res, next) => {
	// template of item to store
	const message = new Message({
		_id: new mongoose.Types.ObjectId(),
		sender: req.body.sender,
		message: req.body.message,
		date_send: new Date(),
		relation_id: req.body.relation_id,
	})

	message.save()
		.then(result => {
			res.status(201).json({
				message: 'Added message succesfully!',
				createdMessage: {
					sender: result.sender,
					message: result.message,
					date_send: result.date_send,
					relation_id: result.relation_id,
					_id: result._id,
					request: {
						type: 'get',
						description: 'GET_THIS_MESSAGES',
						url: 'http://localhost:3000/message/' + result._id,
					}
				}
			})
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
})

router.get('/:messageId', (req, res, next) => {
	const id = req.params.messageId

	Message.findById(id)
		.select('_id sender message date_send relation_id')
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json({
					message: doc,
					request: {
						type: 'GET',
						description: 'GET_ALL_MESSAGES',
						url: 'http://localhost:3000/message/'
					}
				})
			} else {
				res.status(404).json({ message: 'no valid entry found for provided ID' })
			}
		})
		.catch(err => {
			res.status(500).json({ error: err })
		})

})

router.delete('/:messageId', (req, res, next) => {
	const id = req.params.messageId

	Message.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'product deleted!'
			})
		})
		.catch(err => {
			res.status(500).json({ error: err })
		})
})

router.patch('/:messageId', (req, res, next) => {
	const id = req.params.messageId
	const updateOps = {}

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}

	Message.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'message updated!',
				request : {
					type: 'GET',
					url: 'http://localhost:3000/message/'+id,
				}
			 })
		})
		.catch(err => {
			res.status(500).json({ error: err })
		})
})

module.exports = router