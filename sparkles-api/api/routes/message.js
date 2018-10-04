const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/Message');


router.get('/', (req, res, next) => {

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

router.post('/', (req, res, next) =>{

	const message = new Message({
		_id: new mongoose.Types.ObjectId(),
		sender: req.body.sender,
		message: req.body.message,
		//date_send: new Date(),
		relation_id: req.body.relation_id,
	})
	message.save().then(result => {
		console.log(result)
	})
	.catch(err => console.log(err));
	// Message.create(req.body)
	// .then(message => {
	// 	res.json({
	// 		confirmation: 'succes',
	// 		data: message
	// 	})
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'mislukt',
	// 		data: err.message
	// 	})
	// })
})

module.exports = router