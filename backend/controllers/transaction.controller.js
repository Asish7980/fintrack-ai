const { v4: uuidv4 } = require('uuid');

const pool = require('../config/db');


// =====================================
// ADD TRANSACTION
// =====================================
exports.addTransaction = async (
  req,
  res
) => {

  try {

    const {
      type,
      amount,
      category,
      description
    } = req.body;

    if (!type || !amount) {

      return res.status(400).json({
        message:
          'Type and amount required'
      });

    }

    const id = uuidv4();

    await pool.execute(
      `
      INSERT INTO transactions
      (id, user_id, type, amount, category, description)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        req.user.id,
        type,
        amount,
        category,
        description
      ]
    );

    res.status(201).json({
      message:
        'Transaction added successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};


// =====================================
// GET TRANSACTIONS
// =====================================
exports.getTransactions = async (
  req,
  res
) => {

  try {

    const [transactions] =
      await pool.execute(
        `
        SELECT * FROM transactions
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [req.user.id]
      );

    res.json(transactions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};


// =====================================
// UPDATE TRANSACTION
// =====================================
exports.updateTransaction = async (
  req,
  res
) => {

  try {

    const {
      amount,
      type,
      category,
      description
    } = req.body;

    const { id } = req.params;

    await pool.execute(
      `
      UPDATE transactions
      SET
        amount = ?,
        type = ?,
        category = ?,
        description = ?
      WHERE id = ?
      AND user_id = ?
      `,
      [
        amount,
        type,
        category,
        description,
        id,
        req.user.id
      ]
    );

    res.json({
      message:
        'Transaction updated successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};


// =====================================
// DELETE TRANSACTION
// =====================================
exports.deleteTransaction = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await pool.execute(
      `
      DELETE FROM transactions
      WHERE id = ?
      AND user_id = ?
      `,
      [
        id,
        req.user.id
      ]
    );

    res.json({
      message:
        'Transaction deleted successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};