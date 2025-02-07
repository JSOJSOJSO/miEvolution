const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const instanceUrl = 'https://api.evolution.com';
const headers = {
    Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
};

app.post('/sendmessage', async (req, res) => {
    try {
        const { phone, message } = req.body;
        const response = await axios.post(
            `${instanceUrl}/sendmessage`,
            { phone, message },
            { headers }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/sendimage', async (req, res) => {
    try {
        const { phone, image } = req.body;
        const response = await axios.post(
            `${instanceUrl}/sendimage`,
            { phone, image },
            { headers }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/sendfile', async (req, res) => {
    try {
        const { phone, file } = req.body;
        const response = await axios.post(
            `${instanceUrl}/sendfile`,
            { phone, file },
            { headers }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/qr', async (req, res) => {
    try {
        const response = await axios.get(`${instanceUrl}/qr`, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Nuevo endpoint 'isconnect'
app.get('/isconnect', async (req, res) => {
    try {
        const response = await axios.get(`${instanceUrl}/status`, { headers });
        if (response.data.connected) {
            res.json({ connected: true });
        } else {
            res.json({ connected: false });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
