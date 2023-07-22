const express = require('express')

const router = express.Router()

const aboutusController = require('../controllers/aboutusController')



router.get('/aboutus',aboutusController.getaboutus )

module.exports = router