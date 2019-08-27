const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

//DB config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) //Adding new mongo url parser
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Init Bodyparser middleware
app.use(express.json());

//Use routes
app.use('/api/emails', require('./routes/api/email'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
