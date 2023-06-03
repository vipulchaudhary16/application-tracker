const User = require('../models/User');
const OTPSchema = require("../models/Otp")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {
	try {
		let newuser = await User.findOne({ email: req.body.email });
		if (newuser != null) {
			res.status(400).json({ message: "Email Already Exists" });
			return;
		}
		//password hashing
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});

		await newUser.save().then((result) => {
			const payload = {
				user: {
					id: result._id,
					email: result.email
				}
			}
			const token = jwt.sign(payload, SECRET)
			res.status(200).json({ message: "Welcome", token })
		});
	} catch (error) {
		res.status(500).json(error);
	}
}

const authenticateUser = async (req, res) => {
	try {
		const user = await User.findOne({ 'email': req.body.email })
		if (!user) {
			res.status(400).json({ 'message': 'User does not exists' })
		} else {
			const compareResult = await bcrypt.compare(req.body.password, user.password)
			if (!compareResult) {
				res.status(400).json({ 'message': "Wrong credentials" })
			} else {
				const payload = {
					user: {
						id: user.id
					}
				}
				const token = jwt.sign(payload, SECRET)
				res.status(200).json({ 'message': "Welcome", token: token })
			}
		}
	} catch (error) {
		res.status(500).json(error)
		console.log(error)
	}
}

const verifyOTP = async (req, res) => {
	try {
		const { OTP } = req.body
		const { id, email } = req.user
		const OTPRes = await OTPSchema.findOne({ email })

		if (OTPRes.OTP == OTP) {
			await User.findByIdAndUpdate(id, {
				isVerified: true
			})
			res.json({
				message: "Mail verified!"
			})
			await OTPSchema.deleteMany({ email })
		} else {
			res.status(401).json({
				message: "Invalid OTP"
			})
		}
	} catch (error) {

	}
}

module.exports = { registerUser, authenticateUser, verifyOTP }