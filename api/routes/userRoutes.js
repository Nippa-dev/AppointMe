const express = require('express');
const { loginController, registerController, authController, applyOwnerController, getAllNotificationController, deleteAllNotificationController, bookAppointmentController, bookAvailabilityController, userAppointmentController, otpController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllOwnersController } = require('../controllers/adminCtrl');

//router object
const router = express.Router();

//routes
router.post("/login", loginController)
router.post("/register", registerController)

//otp routes
router.post('/send-otp', otpController)

//Auth
router.post("/getUserData", authMiddleware, authController)

//apply doc
router.post("/apply-owner", authMiddleware, applyOwnerController)

//notifications doc
router.post("/get-all-notification", authMiddleware, getAllNotificationController)

//deleteNotifications doc
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController)

//GET all doc
router.get('/getAllOwners', authMiddleware, getAllOwnersController)

//make appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//Booking Availability check
router.post('/booking-availability', authMiddleware, bookAvailabilityController)

//appointment list
router.get('/user-appointment', authMiddleware, userAppointmentController)


module.exports = router