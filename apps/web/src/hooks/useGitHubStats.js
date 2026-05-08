import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-server-kbti.onrender.com';

export function useGitHubStats() {
  const [stats, setStats] = useState({ commitsToday: null, repos: null, weeklyCommits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/github-stats`);
        if (!mounted) return;
        const { commitsToday, repos, weeklyCommits } = res.data;
        setStats({ commitsToday, repos, weeklyCommits });
      } catch (err) {
        if (!mounted) return;
        setError('GitHub stats unavailable');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();
    return () => { mounted = false; };
  }, []);

  return { stats, loading, error };
}
