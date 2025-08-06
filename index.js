const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Hardcoded credentials for demonstration
    if (username === 'user' && password === 'password') {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    import('open').then(open => open.default(`http://localhost:${port}`));
});