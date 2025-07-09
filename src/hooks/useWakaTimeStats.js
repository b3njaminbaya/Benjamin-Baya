import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWakaTimeStats() {
    const [stats, setStats] = useState({
        totalSeconds: 0,
        languages: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://portfolio-server-kbti.onrender.com/api/wakatime-stats');
                const data = res.data.data;

                if (!data || !data.languages) throw new Error("Invalid WakaTime response");

                setStats({
                    totalSeconds: data.total_seconds,
                    languages: data.languages.map(lang => ({
                        name: lang.name,
                        hours: +(lang.total_seconds / 3600).toFixed(1),
                        percent: lang.percent
                    })),
                    daily: data.categories?.map(cat => ({
                        date: cat.range.date, 
                        hours: +(cat.total_seconds / 3600).toFixed(1)
                    })) || []
                });
            } catch (err) {
                setError(err.message || 'WakaTime stats failed');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
}
