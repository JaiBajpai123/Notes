
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./src/utils/errorHandler');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(morgan('dev'));

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 100,
    message: 'You have exceeded the 100 requests in 24 hrs limit!', 
    standardHeaders: true,
    legacyHeaders: false,
  });


app.use('/api/', limiter);

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/notes', require('./src/routes/noteRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;