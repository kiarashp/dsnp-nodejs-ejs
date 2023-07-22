const express = require('express')

const router = express.Router()

const { check, body } = require("express-validator");


const contactUsController = require('../controllers/contactUsController')



router.get('/contactus',contactUsController.getContactUs )
router.post('/contactus',[
    check('email').isEmail().withMessage('لطفا ایمیل معتبر وارد کنید').notEmpty()
],contactUsController.postContactUs )

module.exports = router