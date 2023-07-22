const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const aboutUsSchema = new Schema({
    intro:{
        type: String,
    },
    faradis: {
        type: String,
    },
    coopl: {
        type: String,
    },
    german:    {
        type: String,
    }
})
module.exports= mongoose.model('AboutUs',aboutUsSchema)