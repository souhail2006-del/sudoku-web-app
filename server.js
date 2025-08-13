
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const PASSWORD = '123';

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
