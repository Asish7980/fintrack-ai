const router = require('express').Router();

const transactionController =
  require('../controllers/transaction.controller');

const {
  protect
} = require('../middleware/auth.middleware');


// =====================================
// ADD TRANSACTION
// =====================================
router.post(
  '/',
  protect,
  transactionController.addTransaction
);


// =====================================
// GET TRANSACTIONS
// =====================================
router.get(
  '/',
  protect,
  transactionController.getTransactions
);


// =====================================
// UPDATE TRANSACTION
// =====================================
router.put(
  '/:id',
  protect,
  transactionController.updateTransaction
);


// =====================================
// DELETE TRANSACTION
// =====================================
router.delete(
  '/:id',
  protect,
  transactionController.deleteTransaction
);


module.exports = router;