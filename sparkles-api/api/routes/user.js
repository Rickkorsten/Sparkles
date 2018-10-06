const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post("/signup", (req, res, next) => {
	User.find().or([{ username: req.body.username }, { device_id: req.body.device_id }]).exec()
		.then(user => {
			if (user.length >= 1) {
				res.status(409).json({
					message: 'Username already exist or phone is already in our database'
				})
			} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					personal_details_id: new mongoose.Types.ObjectId(),
					interest_id: new mongoose.Types.ObjectId(),
					username: req.body.username,
					device_id: req.body.device_id,
					sex: req.body.sex,
					preference: req.body.preference,
				})
				user.save()
					.then(result => {
						console.log(result)
						res.status(201).json({
							message: 'user created'
						})
					})
					.catch(err => {
						console.log(err)
						res.status(500).json({
							error: err
						})
					})
			}
		})
})

router.post('/login', (req, res, next) => {
	User.find({ username: req.body.username })
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'auth failed',
				});
			}
			if (user[0].device_id == req.body.device_id) {
				const token = jwt.sign({
					username: user[0].username,
					userId: user[0]._id
				},
					process.env.JWT_KEY,
					{
						expiresIn: "1h",
					},

				)
				return res.status(200).json({
					message: 'auth successfull',
					token: token
				});
			}
			res.status(401).json({
				message: 'auth failed',
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
})

router.delete('/:userId', (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then(result => {
			res.status(201).json({
				message: 'user deleted'
			})
		}).catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
})

module.exports = router

