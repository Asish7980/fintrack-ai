const express = require('express');
require('./config/db');

const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const aiRoutes = require('./routes/ai.routes');

dotenv.config();

const app = express();


// =====================================
// MIDDLEWARE
// =====================================
app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));


// =====================================
// ROUTES
// =====================================
app.use('/api/auth', authRoutes);

app.use('/api/transactions', transactionRoutes);

app.use('/api/analytics', analyticsRoutes);

app.use('/api/ai', aiRoutes);


// =====================================
// TEST ROUTES
// =====================================
app.get('/', (req, res) => {

  res.send('FinTrack AI Backend Running...');

});

app.get('/health', (req, res) => {

  res.json({
    status: 'OK',
    message: 'Server is healthy'
  });

});


// =====================================
// START SERVER
// =====================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});