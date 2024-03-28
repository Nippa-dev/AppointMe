const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getOwnerInfoController, updateProfilesController, getOwnerByidController, ownerAppointmentsController, updateStatusController } = require('../controllers/ownerCtrl')
const router = express.Router()

//POST SINGLE DOC INFO
router.post('/getOwnerInfo', authMiddleware, getOwnerInfoController)

//POST update profile
router.post('/updateProfile', authMiddleware, updateProfilesController)

//POST GET Single Doc Info
router.post('/getOwnerByid', authMiddleware, getOwnerByidController)


//get appointments
router.get('/owner-appointments', authMiddleware, ownerAppointmentsController)

//POST update status
router.post('/update-status', authMiddleware, updateStatusController)
module.exports = router