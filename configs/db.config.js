require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(
    'Successfully connected to the database',
  ))
  .catch(error => console.error(
    `An error ocurred trying to connect to de database ${
      process.env.MONGODB_URI
    }`,
    error,
  ));
