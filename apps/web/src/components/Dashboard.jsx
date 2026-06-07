import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { useWakaTimeStats } from '../hooks/useWakaTimeStats';
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Container from './ui/Container';

const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#a78bfa', '#ec4899'];

const SkeletonCard = () => (
  <div className="bg-gray-800 p-6 rounded-2xl border-l-4 border-gray-700 animate-pulse flex flex-col items-center justify-center min-h-[150px]">
    <div className="h-3 w-32 bg-gray-700 rounded mb-4" />
    <div className="h-8 w-20 bg-gray-700 rounded" />
  </div>
);

const SkeletonChart = () => (
  <div className="bg-gray-800 rounded-2xl p-6 animate-pulse">
    <div className="h-3 w-48 bg-gray-700 rounded mb-6" />
    <div className="h-[300px] bg-gray-700/60 rounded-lg" />
  </div>
);

const StatCard = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gray-800 p-6 rounded-2xl shadow-md border-l-4 border-indigo-500 flex flex-col items-center justify-center text-center min-h-[150px]"
    whileHover={{ scale: 1.03 }}
  >
    <h3 className="text-indigo-300 text-sm font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold text-white">
      {value !== undefined && value !== null ? value : '—'}
    </p>
  </motion.div>
);

const Dashboard = () => {
  const { stats: githubStats, loading: ghLoading, error: ghError } = useGitHubStats();
  const { stats: wakaStats, loading: wakaLoading, error: wakaError } = useWakaTimeStats();

  // Today is the last item in the daily array (server returns 7-day window ending today)
  const todayHours = wakaStats.daily.length > 0
    ? wakaStats.daily[wakaStats.daily.length - 1].hours
    : null;

  const weeklyCodeHours = wakaStats.daily.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    hours: d.hours,
  }));

  const avgDailyHours = weeklyCodeHours.length > 0
    ? (weeklyCodeHours.reduce((sum, d) => sum + d.hours, 0) / weeklyCodeHours.length).toFixed(1)
    : null;

  return (
    <section id="dashboard" className="min-h-screen bg-gray-950 text-white py-14">
      <Container>
        <motion.h2
          className="text-3xl font-bold mb-10 text-center text-indigo-400"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Real-Time Dashboard
        </motion.h2>

        {/* Per-source error banners — don't block the whole dashboard */}
        {ghError && (
          <p className="text-center text-red-400 text-sm font-medium mb-3">⚠️ GitHub: {ghError}</p>
        )}
        {wakaError && (
          <p className="text-center text-amber-400 text-sm font-medium mb-3">⚠️ Activity tracker: {wakaError}</p>
        )}

        {/* Stat cards — each source loads independently */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* WakaTime cards */}
          {wakaLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard
                title="Today's Code Time"
                value={todayHours !== null ? `${todayHours.toFixed(1)} hrs` : '—'}
              />
              <StatCard
                title="Top Language"
                value={wakaStats.languages[0]?.name || '—'}
              />
              <StatCard
                title="Avg Daily Code Time"
                value={avgDailyHours !== null ? `${avgDailyHours} hrs` : '—'}
              />
            </>
          )}

          {/* GitHub cards */}
          {ghLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard title="Commits Today" value={githubStats.commitsToday ?? '—'} />
              <StatCard title="Public Repos" value={githubStats.repos ?? '—'} />
              <StatCard
                title="Languages Used"
                value={wakaLoading ? '—' : (wakaStats.languages.length || '—')}
              />
            </>
          )}
        </div>

        {/* Charts */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {wakaLoading ? (
            <SkeletonChart />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-indigo-300 text-sm font-semibold mb-4">Most Used Languages</h3>
              {wakaStats.languages?.length > 0 ? (
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
                      {wakaStats.languages.slice(0, 5).map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-sm">No language data available.</p>
              )}
            </motion.div>
          )}

          {ghLoading ? (
            <SkeletonChart />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-indigo-300 text-sm font-semibold mb-4">Weekly Contributions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={githubStats.weeklyCommits}>
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" allowDecimals={false} />
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
          )}
        </div>

        {/* GitHub contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 bg-gray-800 rounded-2xl p-6 shadow-md overflow-x-auto"
        >
          <h3 className="text-indigo-300 text-sm font-semibold mb-5">GitHub Contribution Heatmap</h3>
          <GitHubCalendar
            username="b3njaminbaya"
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            hideColorLegend={false}
            hideMonthLabels={false}
          />
        </motion.div>

        {/* Weekly code time chart */}
        <div className="mt-10">
          {wakaLoading ? (
            <SkeletonChart />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-indigo-300 text-sm font-semibold mb-4">Daily Code Time This Week (hrs)</h3>
              {weeklyCodeHours.length === 0 ? (
                <p className="text-gray-400 text-sm">No WakaTime data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyCodeHours}>
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#6366f1"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
