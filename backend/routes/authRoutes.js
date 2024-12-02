const express = require('express');
const { signup, login } = require('../controller/authControllers');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/validate-token', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;
