import React from 'react';
import { motion } from 'framer-motion';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { useWakaTimeStats } from '../hooks/useWakaTimeStats';
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const {
        stats: githubStats,
        loading: ghLoading,
        error: ghError
    } = useGitHubStats('benjaminmweribaya');

    const {
        stats: wakaStats,
        loading: wakaLoading,
        error: wakaError
    } = useWakaTimeStats(process.env.WAKATIME_API_KEY);

    const loading = ghLoading || wakaLoading;
    const error = ghError || wakaError;

    const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#a78bfa', '#ec4899'];

    const weeklyCodeHours = wakaStats?.daily || [];
    const averageCodeHours = (
        weeklyCodeHours.reduce((sum, d) => sum + d.hours, 0) / (weeklyCodeHours.length || 1)
    ).toFixed(1);

    return (
        <section className="bg-gray-950 text-white py-14 px-6">
            <h2 className="text-3xl font-bold mb-10 text-center text-indigo-400">📊 Real‑Time Dashboard</h2>

            {loading && (
                <p className="text-center text-gray-400">Fetching real-time stats...</p>
            )}
            {error && (
                <p className="text-center text-red-400 font-medium">⚠️ {error}</p>
            )}

            {!loading && !error && (
                <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Stat Cards */}
                    <StatCard title="⌛ Today's Code Time" value={`${(wakaStats.totalSeconds / 3600).toFixed(1)} hrs`} />
                    <StatCard title="🧠 Top Language" value={wakaStats.languages[0]?.name || '—'} />
                    <StatCard title="📚 Languages Used" value={wakaStats.languages.length} />
                    <StatCard title="📝 Commits Today" value={githubStats.commitsToday} />
                    <StatCard title="📂 Public Repos" value={githubStats.repos} />
                    <StatCard title="📅 Avg Weekly Code Time" value={`${averageCodeHours} hrs/day`} />
                </div>
            )}

            {!loading && !error && (
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-800 rounded-2xl p-6 shadow-md"
                    >
                        <h3 className="text-indigo-300 text-md font-semibold mb-4">🔵 Most Used Languages</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={wakaStats.languages.slice(0, 5)}
                                    dataKey="percent"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label
                                >
                                    {wakaStats.languages.slice(0, 5).map((_, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-800 rounded-2xl p-6 shadow-md"
                    >
                        <h3 className="text-indigo-300 text-md font-semibold mb-4">📈 Weekly Contributions</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={githubStats.weeklyCommits}>
                                <XAxis dataKey="day" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

const StatCard = ({ title, value }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-md border-l-4 border-indigo-500
               flex flex-col items-center justify-center text-center min-h-[150px]"
        whileHover={{ scale: 1.03 }}
    >
        <h3 className="text-indigo-300 text-md font-medium mb-2">{title}</h3>
        <motion.p
            className="text-3xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
            {value !== undefined ? value : '—'}
        </motion.p>
    </motion.div>
);

export default Dashboard;



