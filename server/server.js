const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', require('./routes/users'));
app.use('/api/portfolios', require('./routes/portfolios'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/reviews', require('./routes/reviews'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Portfolio Marketplace server running on port ${PORT}`));
