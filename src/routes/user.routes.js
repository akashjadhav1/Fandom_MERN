const express = require('express');
const {Register,Login,Logout,deleteUser} = require('../controllers/user.controller')
const {authentication} = require('../middlewares/user.middleware')

const router = express.Router();


router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.delete('/:id',authentication,deleteUser); 









module.exports = router;
