const router = require('express').Router();

const aiController = require('../controllers/ai.controller');

const { protect } = require('../middleware/auth.middleware');

router.post(
  '/chat',
  protect,
  aiController.chatWithAI
);

module.exports = router;