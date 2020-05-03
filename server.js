
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/message', (req, res) => {
    res.send({ "message" : "you're connected!"})
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});



app.listen(port, function () {
    console.log("Server is running on port :" + port)
})