import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import serveIndex from 'serve-index';
import fs from 'fs';
import dotenv from 'dotenv';
import { callVnstat } from './api/vnstat';
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
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about');
});

// Dummy function to get bandwidth data
interface BandwidthUsage {
  incoming: number;
  outgoing: number;
}



async function getBandwidthUsage() {
    try {
        const result = await callVnstat();
        return result.data.interfaces[0].traffic; // Returns only the eth0 interface in the docker container.
        // Use the data as needed
      } catch (error) {
        console.error('Failed to fetch vnstat data:', error);
        return error;
      }
}
/*
app.get('/api/bandwidth', async (req: Request, res: Response) => {
    try {
        const bandwidthData = await getBandwidthUsage();
        res.json(bandwidthData);
    } catch (error) {
        // If an error occurs, send a response indicating failure
        res.status(500).json({ error: 'Failed to fetch bandwidth data' });
    }
});
*/

app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});
