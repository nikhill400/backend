const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/auth');
const config = require('./Database1/dbConfig1');
const path = require('path');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Authentication routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    console.log('Server is running.');
    res.send('Server is running.');
});

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

// Assuming './app' contains additional routes
app.use('/', require('./app'));
