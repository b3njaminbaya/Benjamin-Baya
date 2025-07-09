import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGitHubStats() {
    const [stats, setStats] = useState({
        commitsToday: 0,
        repos: 0,
        weeklyCommits: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://your-backend-url.com/api/github-stats');
                const { commitsToday, repos, weeklyCommits } = res.data;

                setStats({
                    commitsToday,
                    repos,
                    weeklyCommits
                });
            } catch (err) {
                setError(err.message || 'GitHub stats failed');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}



