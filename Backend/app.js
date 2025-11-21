const express = require('express');
const app = express();
const port = 3001;
const dbConnection = require("./db");

app.get('/chiya', (req, res) => {
    res.send('Yo Broo');
    console.log('hi')
});

app.get('/', (req, res) => {
    res.send('Hello World! This is a home page');
});

app.post('/', (req, res) => {
    res.send();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});