const { Router } = require('express');
const verifyUser = require('../middleware/verifyUser');
const Application = require('../models/Application');
const router = Router();

router.get('/', (req, res) => {
  res.json("Application route")
})

router.post('/add', verifyUser, async (req, res) => {
  try {
    const newApplication = new Application({
      userId: req.user.id, //this id is fetched from token itself
      company: req.body.company,
      role: req.body.role,
      status: req.body.status,
      url: req.body.url,
      resume: req.body.resume,
      cv: req.body.cv
    })
    await newApplication.save().then(() => {
      res.json({ "message": "application added" })
    })
  } catch (error) {
    //Internal server error
    res.status(500).json(error);
  }
});

router.put('/update/:id', verifyUser, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application.userId === req.user.id) {
      await Application.findByIdAndUpdate(req.params.id, req.body);
      res.json({ "message": "application updated" })
    } else {
      res.status(401).json({ "message": "unauthorized" })
    }
  } catch (error) {
    res.status(500).json({ "message": "Internal server error" })
  }
})

router.delete('/delete/:id', verifyUser, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application.userId === req.user.id) {
      await Application.findByIdAndDelete(req.params.id);
      res.json({ "message": "application deleted" })
    } else {
      res.status(401).json({ "message": "unauthorized" })
    }
  } catch (error) {
    res.status(500).json({ "message": "Internal server error" })
  }
})

router.get('/get-all', verifyUser, async (req, res) => {
  try {
    const userId = req.user.id //provide by middleware
    const applications = await Application.find({ userId: userId })
    res.json(applications);
  } catch (error) {
    res.status(5000).json({ message: "Internal server error" })
  }
})


module.exports = router;