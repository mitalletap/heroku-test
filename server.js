
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.get('/', (req, res) => {
    res.send({ "message" : "you're connected!"})
});





app.listen(process.env.PORT || 5000, function () {
    console.log("Server is running on port :" + port)
})