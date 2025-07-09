require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/github-stats', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/wakatime-stats', async (req, res) => {
    try {
        const response = await axios.get('https://wakatime.com/api/v1/users/current/stats', {
            headers: {
                Authorization: `Bearer ${process.env.WAKATIME_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
