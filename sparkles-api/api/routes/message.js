const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/Message');


router.get('/', (req, res, next) => {

	Message.find()
	.exec()
	.then(docs => {
		res.status(200).json(docs)
	})
	.catch(err => {
		res.status(500).json({
			error: err
		})
	})

})

router.post('/', (req, res, next) =>{

	const message = new Message({
		_id: new mongoose.Types.ObjectId(),
		sender: req.body.sender,
		message: req.body.message,
		date_send: new Date(),
		relation_id: req.body.relation_id,
	})

	message
	.save()
	.then(result => {
		res.status(201).json({
			message: 'handling POST',
			createdMessage: result
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

	Message
	.findById(id)
	.exec()
	.then(doc => {
		if (doc) {
			res.status(200).json(doc)
		} else {
			res.status(404).json({message: 'no valid entry found for provided ID'})
		}
	})
	.catch(err => {
		res.status(500).json({error : err})
	})

})

router.delete('/:messageId', (req, res, next) => {
	const id = req.params.messageId
	const updateOps = {}

	for(const ops of req.body){
		updateOps[ops.propName] = ops.value
	}

	Message.update({ _id: id}, { $set: {message: req.body.newMessage } })
	.exec()
	.then(result => {
			res.status(200).json({result})
	})
	.catch(err => {
		res.status(500).json({error : err})
	})

})

router.patch('/:messageId', (req, res, next) => {
	const id = req.params.messageId

	Message.remove({ _id: id})
	.exec()
	.then(result => {
			res.status(200).json(result)
	})
	.catch(err => {
		res.status(500).json({error : err})
	})

})

module.exports = router