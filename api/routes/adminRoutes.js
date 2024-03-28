const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllOwnersController, changeAccountStatusController } = require('../controllers/adminCtrl');

const router = express.Router();

//Get Method
router.get('/getAllUsers', authMiddleware, getAllUsersController)
router.get('/getAllOwners', authMiddleware, getAllOwnersController)

//POST acc status
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
module.exports = router;