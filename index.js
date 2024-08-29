const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

const userRoutes = require('./Backend/routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('The Backend Is Running!');
});

function setUpHTTPServer() {
    app.listen(PORT, () => {
        console.log(`Chat App Is Running On 127.0.0.1:${PORT}`);
    });
}

async function initDB() {
    const db = process.env.DB || "mongodb://localhost:27017/ChatApp";
    try {
        await mongoose.connect(db);
        console.log("MongoDB Connected To: " + db);
    } catch (err) {
        console.error("MongoDB Failed To Connect: " + err);
    }
}

async function setUpServer() {
    await initDB();
    setUpHTTPServer();
}

setUpServer();
