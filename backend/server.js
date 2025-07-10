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

    // 1. Get summary stats
    const summaryRes = await axios.get('https://wakatime.com/api/v1/users/current/stats', {
      headers: { Authorization: `Basic ${auth}` }
    });

    const summaryData = summaryRes.data.data;

    // 2. Get daily breakdown for the past 7 days
    const today = new Date();
    const daily = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formatted = date.toISOString().split('T')[0];

      const dailyRes = await axios.get(`https://wakatime.com/api/v1/users/current/summaries?start=${formatted}&end=${formatted}`, {
        headers: { Authorization: `Basic ${auth}` }
      });

      const summary = dailyRes.data.data[0];
      daily.push({
        date: formatted,
        hours: +(summary.grand_total.total_seconds / 3600).toFixed(2),
      });
    }

    res.json({
      data: {
        total_seconds: summaryData.total_seconds,
        languages: summaryData.languages,
        daily
      }
    });

  } catch (err) {
    console.error('WakaTime error:', err?.response?.data || err.message || err);
    res.status(500).json({ error: err?.response?.data?.error || err.message || 'Unknown error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
