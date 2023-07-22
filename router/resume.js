const express = require('express')

const router = express.Router()

const resumeController = require('../controllers/resumeControllers')



router.get('/resume',resumeController.getResume )

module.exports = router