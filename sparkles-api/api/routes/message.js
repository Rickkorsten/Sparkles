const express = require('express');
const router = express.Router()

const Message = require('../../models/Message');


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