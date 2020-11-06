require('dotenv').config();

const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const socketio = require("socket.io");

const app = require('express')();

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

mongoose.connection.once("open", () => {
  console.log("Connected to DB!");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

const server = app.listen(PORT, () => {
  console.log(`app running on port number ${PORT}`);
});


app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);


const io = socketio(server);

mongoose.connect(process.env.URI_MDB, { useNewUrlParser: true, useUnifiedTopology: true });
