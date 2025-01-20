const express = require('express');
const server = express();
const morgan = require('morgan');
const session = require('express-session');
const connectDB = require('./connect');
require('dotenv').config();
const authRoute = require('./routes/auth')

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//logs
server.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

// Routes
server.get('/', (req, res) => {
  res.status(200).json('Server is running 🚀');
});

//authroutes
server.use('/api/v1/auth', authRoute);

// Run server
const PORT = process.env.PORT;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running port ${PORT}🚀🚀🚀🚀`);
});
