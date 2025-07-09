import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWakaTimeStats(apiKey) {
    const [stats, setStats] = useState({
        languages: [],
        totalSeconds: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!apiKey) return;

        const fetchStats = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    'https://wakatime.com/api/v1/users/current/stats/last_7_days',
                    {
                        headers: {
                            Authorization: `Basic ${btoa(apiKey)}`,
                        },
                    }
                );

                const data = response.data.data;

                setStats({
                    totalSeconds: data.total_seconds || 0,
                    languages: (data.languages || []).map((lang) => ({
                        name: lang.name,
                        hours: +(lang.total_seconds / 3600).toFixed(1),
                    })),
                });
            } catch (err) {
                setError(err.response?.data?.error || err.message || 'WakaTime API error');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [apiKey]);

    return { stats, loading, error };
}
