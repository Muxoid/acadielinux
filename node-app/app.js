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


// Directory to serve mirror.
const servePath = path.join(__dirname, 'mirror');

// Serve static files and provide directory listing
app.use('/mirror', express.static(servePath));
app.use('/mirror', serveIndex(servePath, {'icons': true}));

// Directory to serve public website files.
const servePubPath = path.join(__dirname, 'public');

// Serve static files and provide directory listing
app.use('/public', express.static(servePubPath));
app.use('/public', serveIndex(servePubPath, {'icons': true}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Dummy function to get bandwidth data
function getBandwidthUsage() {
    return {
      incoming: Math.random() * 100, // Random data for demonstration
      outgoing: Math.random() * 100
    };
  }
  
  app.get('/api/bandwidth', (req, res) => {
    res.json(getBandwidthUsage());
  });

if (process.env.NODE_ENV === 'production') {
// SSL certificate
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/mirror.acadielinux.ca/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mirror.acadielinux.ca/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/mirror.acadielinux.ca/chain.pem')
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
