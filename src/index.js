const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();

app.use(morgan('common'));
app.use(helmet());

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
  res.json({'message': 'Hello World!'});
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

const PORT = 3000; // TODO use environment variables
app.listen(PORT, () =>{
  console.log(`listening on port ${PORT}`);
});