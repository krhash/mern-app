const express = require('express');
const { readFile } = require('fs');
const app = express();

app.get('/home', (req, res) => {
    readFile('home.html', 'utf8', (err, html) => {
        if (err) {
            res.sendStatus(500).send('Could not read home.html');
        }

        res.render(html);
    })
})

app.listen(3000, 'localhost', () => {
    console.log('Server running on port 3000');
})