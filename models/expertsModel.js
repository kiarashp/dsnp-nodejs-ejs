const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const expertSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    description:    {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    telegramurl: {
        type: String,
        required: false
    },
    whatsappurl: {
        type: String,
        required: false
    }
})
module.exports= mongoose.model('Expert',expertSchema)