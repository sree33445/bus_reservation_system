const express = require('express');
const { bookBus, getAllBuses } = require('../controller/busController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/book-bus/:busId', authenticateToken, bookBus);

router.get('/buses', getAllBuses)

module.exports = router;
