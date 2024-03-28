const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected Successfully ${mongoose.connection.host}`.bgGreen.yellow)
    } catch (error) {
        console.log(`MongoDB server issue ${error}`.bgRed.white)
    }
}
module.exports = connectDB