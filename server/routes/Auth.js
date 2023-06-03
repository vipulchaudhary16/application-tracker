const { Router } = require('express');
const { registerUser, authenticateUser, verifyOTP } = require('../controller/Auth');
const { sendVerificationMail } = require('../controller/Mailing');
const verifyUser = require('../middleware/verifyUser');
const router = Router();

router.get('/', (req, res) => {
	res.json("Auth route")
})

router.post('/register', registerUser);
router.post('/login', authenticateUser);
//TODO: add fuction to get one user
router.get('/user/:id', () => { });
router.post('/user/verify', verifyUser, verifyOTP);
router.post('/send-verification-mail', verifyUser, sendVerificationMail);

module.exports = router;