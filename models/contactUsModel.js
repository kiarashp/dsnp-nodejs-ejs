const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const contactUsSchema = new Schema({
    address:{
        type: String,
    },
    phone: {
        type: String,
    },
    fax: {
        type: String,
    },
    whatsapp:    {
        type: String,
    }
})
module.exports= mongoose.model('ContactUs',contactUsSchema)