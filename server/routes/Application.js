const { Router } = require('express');
const verifyUser = require('../middleware/verifyUser');
const { addNewApplication, updateApplication, deleteApplication, getApplications } = require('../controller/Applications');
const router = Router();

router.get('/', (req, res) => {
  res.json("Application route")
})

router.post('/add', verifyUser, addNewApplication);

router.put('/update/:id', verifyUser, updateApplication)

router.delete('/delete/:id', verifyUser, deleteApplication)

router.get('/get-all', verifyUser, getApplications)


module.exports = router;