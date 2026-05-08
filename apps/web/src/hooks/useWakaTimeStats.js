import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-server-kbti.onrender.com';

export function useWakaTimeStats() {
    const [stats, setStats] = useState({ totalSeconds: 0, languages: [], daily: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/api/wakatime-stats`);
                const data = res.data.data;

                if (!data || !data.languages) throw new Error('Invalid WakaTime response');

                setStats({
                    totalSeconds: data.total_seconds,
                    languages: data.languages.map(lang => ({
                        name: lang.name,
                        hours: +(lang.total_seconds / 3600).toFixed(1),
                        percent: lang.percent,
                    })),
                    daily: data.daily || [],
                });
            } catch (err) {
                setError(err.message || 'WakaTime stats unavailable');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
