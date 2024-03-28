const ownerModel = require('../models/ownerModels')
const userModel = require('./../models/userModels')

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({ success: true, message: 'User Data list', data: users })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Error  while fetching users ', error })
    }
}
const getAllOwnersController = async (req, res) => {
    try {
        const owners = await ownerModel.find({})
        res.status(200).send({ success: true, message: 'Owner Data List Fetched Successfuly', data: owners })


    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Error  while getting owners ', error })
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { ownerId, status } = req.body
        const owner = await ownerModel.findByIdAndUpdate(ownerId, { status })
        const user = await userModel.findOne({ _id: owner.userId })
        const notification = user.notification
        notification.push({
            type: 'owner-account-request-updated',
            message: `Your account request has ${status} update`,
            onClickPath: '/notification'
        });
        user.isOwner = status === 'approved' ? true : false
        await user.save();
        res.status(201).send({
            success: true,
            message: `Account Status Updated `,
            data: owner,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Error in Changing Account Status ', error })
    }
}

module.exports = { getAllOwnersController, getAllUsersController, changeAccountStatusController }