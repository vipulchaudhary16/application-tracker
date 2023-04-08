const express = require('express');
const { connectToMongo } = require('./config');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
dotenv.config();

const PORT = process.env.port || 8000;

app.use(express.json());

connectToMongo()

app.get("/api" , (req, res) => {
    res.json({message: "Hello from API"})
})

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/application', require('./routes/Application'))

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});