// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const User = require('../models/User');

router.get('/user', (req, res) => {
	// const query = req.query
	let filters = req.query;
	// als er een age filter in de query zit checkt hij standaard of hij groter is dan het ingevoerde getal in de query
	if (req.query.age != null){
		filters = {
			age: {$gt: req.query.age}
		}
	}

	// .find({age:{$gt:30, $lt:40}})
	// in de .find(name:'Lionel') kan je query maken
	User.find(filters)
	.then(users => {
		res.json({
			confirmation: 'gelukt',
			data: users
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: err.message
		})
	})

})

//update profile // NON-RESTfull
router.get('/user/update', (req, res) => {// normaal is de .get een .put // 
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

router.get('/user/remove', (req, res) => {
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
router.get('/user/:id', (req, res) => {
	const id = req.params.id

	User.findById(id)
	.then(user => {
		res.json({
			confirmation: 'succes',
			data: user
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'mislukt',
			data: 'Profile with ' + id + ' not found.'
		})
	})
})

router.post('/user', (req, res) =>{

	User.create(req.body)
	.then(user => {
		res.json({
			confirmation: 'succes',
			data: user
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
