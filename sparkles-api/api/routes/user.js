const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post("/signup", (req, res, next) => {
	user.find({ username: req.body.username })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				res.status(409).json({
					message: 'Username already exist or phone is already in our database'
				})
			} else {
				bcrypt.hash(req.body.device_id, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						})
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							personal_details_id: new mongoose.Types.ObjectId(),
							interest_id: new mongoose.Types.ObjectId(),
							username: req.body.username,
							device_id: hash,
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
			}
		})
})

module.exports = router

