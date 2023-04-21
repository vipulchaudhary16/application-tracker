const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

router.get('/', (req, res) => {
  res.json("Auth route")
})

router.post('/register', async (req, res) => {
  try {
    let newuser = await User.findOne({ email: req.body.email });
    if (newuser != null) {
      res.status(400).json({ message: "Email Already Exists" });
      return;
    }

    /* TODO Hasing passoword */

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save().then((result) => {
      res.json({ message: "Account created" })
    });
  } catch (error) {
    //Internal server error
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ 'email': req.body.email })
    if (!user) {
      res.status(400).json({ 'message': 'User does not exists' })
    } else {
      if (req.body.password != user.password) {
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
});

router.get('/user/:id', (req, res) => {

});

router.get('/send-verification-email', (req, res) => {

});

module.exports = router;