const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' +file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage: storage, 
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post("/signup", upload.single('userImage'), (req, res, next) => {
	console.log(req.file)
	User.find({ device_id: req.body.device_id }).exec()
		.then(user => {
			if (user.length >= 1) {
				res.status(409).json({
					message: 'phone is already in our database, you cant create multiple account'
				})
			} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					personal_details_id: new mongoose.Types.ObjectId(),
					interest_id: new mongoose.Types.ObjectId(),
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					device_id: req.body.device_id,
					sex: req.body.sex,
					preference: req.body.preference,
					userImage: req.file.path
				})
				user.save()
					.then(result => {
						console.log(result)
						res.status(201).json({
							User: result
							// request: {
							// 	type: 'GET personal ',
							// 	description: 'GET_THIS_MESSAGES',
							// 	url: 'http://localhost:3000/message/' + result._id,
							// }
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
	User.find({ device_id: req.body.device_id })
		.exec()
		.then(user => {
			console.log("de usertttttt " + user[0]);
			if (user.length < 1) {
				return res.status(401).json({
					message: 'auth failed!!',
				});
			}
			if (user[0].lastName == req.body.lastName) {
				const token = jwt.sign({
					lastName: user[0].lastName,
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

