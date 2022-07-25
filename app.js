const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const isAuthorised = require('./middlewares/isAuthorised');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(isAuthorised);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.listen(PORT, 'localhost');
