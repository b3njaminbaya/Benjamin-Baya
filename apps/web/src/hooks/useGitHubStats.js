import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-server-kbti.onrender.com';

export function useGitHubStats() {
    const [stats, setStats] = useState({ commitsToday: 0, repos: 0, weeklyCommits: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/api/github-stats`);
                const { commitsToday, repos, weeklyCommits } = res.data;
                setStats({ commitsToday, repos, weeklyCommits });
            } catch (err) {
                setError(err.message || 'GitHub stats unavailable');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
