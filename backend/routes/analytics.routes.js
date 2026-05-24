const router = require('express').Router();

const analyticsController = require('../controllers/analytics.controller');

const { protect } = require('../middleware/auth.middleware');


// SUMMARY
router.get(
  '/summary',
  protect,
  analyticsController.getSummary
);


// CATEGORY BREAKDOWN
router.get(
  '/categories',
  protect,
  analyticsController.getCategories
);


// MONTHLY
router.get(
  '/monthly',
  protect,
  analyticsController.getMonthly
);


module.exports = router;