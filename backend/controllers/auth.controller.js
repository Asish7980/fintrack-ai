const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { v4: uuidv4 } =
  require('uuid');

const pool =
  require('../config/db');


// =====================================
// REGISTER
// =====================================
exports.register = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK EXISTING USER
    const [existingUser] =
      await pool.execute(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email]
      );

    if (
      existingUser.length > 0
    ) {

      return res.status(400).json({
        message:
          'User already exists'
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const id = uuidv4();

    // INSERT USER
    await pool.execute(
      `
      INSERT INTO users
      (
        id,
        email,
        password_hash,
        full_name
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        id,
        email,
        hashedPassword,
        name
      ]
    );

    res.status(201).json({
      message:
        'User registered successfully'
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
// LOGIN
// =====================================
exports.login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    // CHECK USER
    const [users] =
      await pool.execute(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email]
      );

    if (
      users.length === 0
    ) {

      return res.status(400).json({
        message:
          'Invalid credentials'
      });

    }

    const user = users[0];

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          'Invalid credentials'
      });

    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.json({
      token
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message
    });

  }

};