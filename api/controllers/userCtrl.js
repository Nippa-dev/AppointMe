const userModel = require('../models/userModels')
const ownerModel = require('../models/ownerModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment');
const nodemailer = require('nodemailer');
//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: "User Already Exists", success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registered Successfully", success: true });

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register Controller ${error.message}`.bgRed.white })
    }
};

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid Credentials", success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Success', success: true, token })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const otpController = async (req, res) => {
    try {

        const { email } = req.body;


        let transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.otpEmail,
                pass: 'your-password'
            }
        });


        const otp = Math.floor(100000 + Math.random() * 900000);

        let mailOptions = {
            from: process.env.otpEmail,
            to: email,
            subject: 'Your OTP',
            text: `Your OTP is: ${otp}`
        };

        // Send email
        await transporter.sendMail(mailOptions);


        console.log(`OTP sent to ${email}: ${otp}`);


        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);

        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
}
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'auth error', success: false, error })
    }
}

const applyOwnerController = async (req, res) => {

    try {
        const newOwner = await ownerModel({ ...req.body, status: 'pending' });
        await newOwner.save()
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification
        notification.push({
            type: 'apply-owner-request',
            message: `${newOwner.firstName} ${newOwner.lastName} has Applied `,
            data: {
                ownerId: newOwner._id,
                name: newOwner.firstName + " " + newOwner.lastName,
                onClickPath: "/admin/owners"
            }
        })

        //  await userModel.findByIdAndUpdate({adminUser._id,{notification}})
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({ success: true, message: "Account registered successfully" })


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error while applying owner' })
    }

}

const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateUser = await user.save()
        res.status(200).send({ success: true, message: 'All Notifications Marked as read', data: updateUser })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error while applying owner', success: false, error })
    }
}

const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({ success: true, message: 'All Notifications Deleted Succesfully', data: updatedUser })


    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Enable to delete all notifications', error })
    }


}
//GET ALL DOC
const getAllOwnersController = async (req, res) => {
    try {
        const owners = await ownerModel.find({ status: 'approved' });
        res.status(200).send({ success: true, message: 'List fetched successfully', data: owners, })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: 'Error While Fetching Details' })
    }
}

//make appointment
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.ownerInfo.userId })
        user.notification.push({
            type: "New-appointment-request",
            message: `A new Appointment request from ${req.body.userInfo.name}`,
            onClickPath: "/user/appointments"
        });
        await user.save()
        res.status(200).send({
            success: true,
            message: "Appointments booked successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: "Error while booking" })
    }
}

// book availability
const bookAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
        const ownerId = req.body.ownerId
        const appointments = await appointmentModel.find({
            ownerId, date, time: {
                $gte: fromTime,
                $lte: toTime,
            }
        })
        if (appointments.length > 0) {
            return res.status(200).send({
                message: 'Appointment not Available at this moment',
                success: false,
            })
        } else {
            return res.status(200).send({
                success: true,
                message: 'Appointments Available'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: "Error in Booking" })
    }
}

const userAppointmentController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'User Appointment Fetch Successfully',
            data: appointments
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: "Error in User Appointment" })
    }
}

module.exports = { registerController, loginController, otpController, authController, applyOwnerController, getAllNotificationController, deleteAllNotificationController, getAllOwnersController, bookAppointmentController, bookAvailabilityController, userAppointmentController }