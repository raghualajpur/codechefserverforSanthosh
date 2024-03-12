// proxy-server.mjs
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors())
const PORT = 3010;

// Proxy endpoint
app.get('/fetch-data', async (req, res) => {
    try {
        // Fetch data from the external server
        const response = await fetch('https://codechef-api.vercel.app/klu_030392');

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Get the JSON response from the external server
        const data = await response.json();

        // Forward the response to the client
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
