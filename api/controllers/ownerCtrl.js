const appointmentModel = require('../models/appointmentModel');
const ownerModel = require('../models/ownerModels')
const userModel = require('../models/userModels');
const getOwnerInfoController = async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'Owner data fetch success',
            data: owner
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Fetching Details"
        })
    }

}

const updateProfilesController = async (req, res) => {
    try {
        const owner = await ownerModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({ success: true, message: "Owner Profile Update", data: owner });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Profile update",
            error
        });
    }
}


//get doc info for users display
const getOwnerByidController = async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ _id: req.body.ownerId })
        res.status(200).send({ success: true, message: "Data fetched Successfully ", data: owner });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, error, message: "Error in getting Info" })
    }
}

const ownerAppointmentsController = async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({
            ownerId: owner._id,
        });
        res.status(200).send({
            success: true,
            message: "Owner Appointments fetch Successfully",
            data: appointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in salon Appointments",
        });
    }
}


const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(
            appointmentsId,
            { status }
        );
        const user = await userModel.findOne({ _id: appointments.userId });
        const notifcation = user.notifcation;
        notifcation.push({
            type: "status-updated",
            message: `your appointment has been updated ${status}`,
            onCLickPath: "/owner-appointments",
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Update Status",
        });
    }
};


module.exports = { getOwnerInfoController, updateProfilesController, getOwnerByidController, ownerAppointmentsController, updateStatusController }



