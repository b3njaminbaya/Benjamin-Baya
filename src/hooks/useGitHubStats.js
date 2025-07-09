import { useState, useEffect } from 'react';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function useGitHubStats(username) {
    const [stats, setStats] = useState({
        commitsToday: 0,
        repos: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username || !GITHUB_TOKEN) return;

        const fetchStats = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const isoDate = new Date(today.setHours(0, 0, 0, 0)).toISOString();

            const query = `
        query {
          user(login: "${username}") {
            repositories(privacy: PUBLIC) {
              totalCount
            }
            contributionsCollection(from: "${isoDate}") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;

            try {
                const response = await fetch('https://api.github.com/graphql', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                const result = await response.json();

                if (result.errors) {
                    throw new Error(result.errors[0].message || 'GitHub API error');
                }

                const user = result.data.user;

                setStats({
                    commitsToday:
                        user?.contributionsCollection?.contributionCalendar?.totalContributions || 0,
                    repos: user?.repositories?.totalCount || 0,
                });
            } catch (err) {
                setError(err.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [username]);

    return { stats, loading, error };
}
