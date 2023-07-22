const express = require('express')

const router = express.Router()

const expertsController = require('../controllers/expertsControllers')

router.get('/experts',expertsController.getExperts )


module.exports = router