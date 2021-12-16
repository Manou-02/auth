const router = require('express').Router();
const { register, login, checkLogin } = require('../controllers/user.controllers');


router.post('/register', register);
router.post('/login', login);
router.get('/login', checkLogin);


module.exports = router;