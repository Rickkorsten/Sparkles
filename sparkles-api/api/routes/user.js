const express = require('express');
const router = express.Router()

const User = require('../../models/User');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "handling get request to user"
	})
	// // const query = req.query
	// let filters = req.query;
	// // als er een age filter in de query zit checkt hij standaard of hij groter is dan het ingevoerde getal in de query
	// if (req.query.age != null){
	// 	filters = {
	// 		age: {$gt: req.query.age}
	// 	}
	// }

	// // .find({age:{$gt:30, $lt:40}})
	// // in de .find(name:'Lionel') kan je query maken
	// User.find(filters)
	// .then(users => {
	// 	res.json({
	// 		confirmation: 'gelukt',
	// 		data: users
	// 	})
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'mislukt',
	// 		data: err.message
	// 	})
	// })

})

//update profile // NON-RESTfull
router.get('/update', (req, res, next) => {// normaal is de .get een .put // 
	const query = req.query // require: id, key=value
	const userId = query.id
	delete query['id']

	User.findByIdAndUpdate(userId, query, {new:true})
	.then(updatedUser => {
		res.json({
			confirmation: 'succes',
			data: updatedUser
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})
})

router.get('/remove', (req, res, next) => {
	const query = req.query

	User.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'succes',
			data:'Profile '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

// get profile with id
router.get('/:id', (req, res, next) => {
	const id = req.params.id

	if (id === 'special') {
		res.status(200).json({
			message: 'jow wild gek doon!',
			id: id,
		});
	} else {
		res.status(200).json({
			message: 'you passed an ID',
			id: id
		});
	}
})

router.post('/', (req, res, next) => {
	const user = {
		userName: req.body.userName,
		age: req.body.age
	}
	res.status(201).json({
		message: "handling get request to user",
		user: user
	})
	// User.create(req.body)
	// .then(user => {
	// 	res.json({
	// 		confirmation: 'succes',
	// 		data: user
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
