const express = require('express');
const { engine } = require('express-handlebars');
const https = require('https');
const path = require('path');
const serveIndex = require('serve-index');
const fs = require('fs');
require('dotenv').config();


const app = express();
const devPort = 3000;
const prodPort = 443;

const port = process.env.NODE_ENV === 'production' ? prodPort : devPort;

// Setup Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// Directory to serve
const servePath = path.join(__dirname, 'public');

// Serve static files and provide directory listing
app.use('/mirrors', express.static(servePath));
app.use('/mirrors', serveIndex(servePath, {'icons': true}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

if (process.env.NODE_ENV === 'production') {
// SSL certificate
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/mirrors.acadielinux.ca/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mirrors.acadielinux.ca/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/mirrors.acadielinux.ca/chain.pem')
};


// Start server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server running on https://localhost:${port}`);
});
} else {
    // Development mode - HTTP
    app.listen(devPort, () => {
        console.log(`Server running on http://localhost:${devPort}`);
    });
}
