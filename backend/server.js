require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/github-stats', async (req, res) => {
    try {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);

        const formatDate = date => date.toISOString().split('T')[0];

        const query = `
        query {
          viewer {
            contributionsCollection(from: "${formatDate(startDate)}T00:00:00Z", to: "${formatDate(today)}T23:59:59Z") {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
              commitContributionsByRepository {
                repository {
                  name
                }
              }
            }
            repositories(privacy: PUBLIC) {
              totalCount
            }
          }
        }
        `;

        const response = await axios.post(
            'https://api.github.com/graphql',
            { query },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = response.data.data.viewer;
        const repos = data.repositories.totalCount;

        const allDays = data.contributionsCollection.contributionCalendar.weeks
            .flatMap(week => week.contributionDays)
            .slice(-7);

        const weeklyCommits = allDays.map(day => ({
            day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
            commits: day.contributionCount
        }));

        const commitsToday = weeklyCommits[weeklyCommits.length - 1]?.commits || 0;

        res.json({
            commitsToday,
            repos,
            weeklyCommits
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/wakatime-stats', async (req, res) => {
    try {
        const auth = Buffer.from(`${process.env.WAKATIME_API_KEY}:`).toString('base64');

        const response = await axios.get('https://wakatime.com/api/v1/users/current/stats', {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        res.json(response.data);
    } catch (err) {
        console.error('WakaTime error:', err?.response?.data || err.message || err);
        res.status(500).json({ error: err?.response?.data?.error || err.message || 'Unknown error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
