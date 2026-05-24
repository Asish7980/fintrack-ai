const pool = require('../config/db');


// =====================================
// SUMMARY ANALYTICS
// =====================================
exports.getSummary = async (req, res) => {

  try {

    const [rows] = await pool.execute(
      `
      SELECT
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = ?
      `,
      [req.user.id]
    );

    const data = rows[0];

    const income = Number(data.total_income || 0);

    const expense = Number(data.total_expense || 0);

    res.json({
      total_income: income,
      total_expense: expense,
      balance: income - expense
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// =====================================
// CATEGORY BREAKDOWN
// =====================================
exports.getCategories = async (req, res) => {

  try {

    const [rows] = await pool.execute(
      `
      SELECT
        category,
        SUM(amount) AS total
      FROM transactions
      WHERE user_id = ?
      AND type = 'expense'
      GROUP BY category
      ORDER BY total DESC
      `,
      [req.user.id]
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// =====================================
// MONTHLY ANALYTICS
// =====================================
exports.getMonthly = async (req, res) => {

  try {

    const [rows] = await pool.execute(
      `
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
      FROM transactions
      WHERE user_id = ?
      GROUP BY month
      ORDER BY month ASC
      `,
      [req.user.id]
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};