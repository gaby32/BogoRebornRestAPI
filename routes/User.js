const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

router.get('/user', userController.getAll);
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.put('/profileupdate/:_id', userController.updateProfile);
module.exports = router;