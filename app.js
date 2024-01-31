const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const serveIndex = require('serve-index');

const app = express();
const port = 3000;

// Setup Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// Directory to serve
const servePath = path.join(__dirname, 'public');

// Serve static files and provide directory listing
app.use('/arch', express.static(servePath));
app.use('/arch', serveIndex(servePath, {'icons': true}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
