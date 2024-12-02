const express = require('express');
const { submitFeedback } = require('../controller/feedbackController');
const router = express.Router();

router.post('/feed', submitFeedback);

module.exports = router;
