import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import serveIndex from 'serve-index';
import fs from 'fs';
import dotenv from 'dotenv';
import { fetchNginxStatus } from './api/nginxStats';
dotenv.config();

const app = express();
const Port = 3000;

// Setup Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Directory to serve mirror.
const servePath = path.join(__dirname, 'mirror');

// Serve static files and provide directory listing
app.use('/mirror', express.static(servePath), serveIndex(servePath, { 'icons': true }));

// Directory to serve public website files.
const servePubPath = path.join(__dirname, 'public');

// Serve static files and provide directory listing
app.use('/public', express.static(servePubPath), serveIndex(servePubPath, { 'icons': true }));

// Routes
app.get('/', async (req: Request, res: Response) => {

    const nginxStatus = await fetchNginxStatus();
    const stats = [
        { title: "Active Connections", value: nginxStatus.activeConnections },
        { title: "Accepts", value: nginxStatus.accepts },
        { title: "Handled", value: nginxStatus.handled },
        { title: "Queue", value: nginxStatus.reading }
    ];
    res.render('index', {stats});
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about');
});







app.get('/api/bandwidth', async (req: Request, res: Response) => {
    try {
        const bandwidthData = await fetchNginxStatus();
        res.json(bandwidthData);
    } catch (error) {
        // If an error occurs, send a response indicating failure
        res.status(500).json({ error: 'Failed to fetch bandwidth data' });
    }
});


app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});
