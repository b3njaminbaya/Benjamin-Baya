require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { buildContext, buildSystemPrompt, getFallbackResponse } = require('./knowledgeBase');

const app = express();
const PORT = process.env.PORT || 5001;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite dev server (P1 migration)
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('CORS: origin not allowed'));
    },
  })
);

app.use(express.json({ limit: '16kb' }));

// ─── RATE LIMITING ───────────────────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment.' },
});

// Stricter limiter for AI chat (Claude API calls are expensive)
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Chat rate limit reached. Please wait a few minutes.' },
});

app.use(generalLimiter);

// ─── IN-MEMORY CACHE ─────────────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── GITHUB STATS ────────────────────────────────────────────────────────────
app.get('/api/github-stats', async (req, res) => {
  const cached = getCached('github-stats');
  if (cached) return res.json(cached);

  try {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const fmt = (d) => d.toISOString().split('T')[0];

    const query = `
      query {
        viewer {
          contributionsCollection(
            from: "${fmt(startDate)}T00:00:00Z"
            to:   "${fmt(today)}T23:59:59Z"
          ) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
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
          'Content-Type': 'application/json',
        },
      }
    );

    const viewer = response.data.data.viewer;
    const repos = viewer.repositories.totalCount;

    const allDays = viewer.contributionsCollection.contributionCalendar.weeks
      .flatMap((w) => w.contributionDays)
      .slice(-7);

    const weeklyCommits = allDays.map((d) => ({
      day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
      commits: d.contributionCount,
    }));

    const commitsToday = weeklyCommits[weeklyCommits.length - 1]?.commits ?? 0;

    const result = { commitsToday, repos, weeklyCommits };
    setCache('github-stats', result);
    res.json(result);
  } catch (err) {
    console.error('GitHub error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── WAKATIME STATS (parallelised) ───────────────────────────────────────────
app.get('/api/wakatime-stats', async (req, res) => {
  const cached = getCached('wakatime-stats');
  if (cached) return res.json(cached);

  try {
    const auth = Buffer.from(`${process.env.WAKATIME_API_KEY}:`).toString('base64');
    const headers = { Authorization: `Basic ${auth}` };

    // Build the 7 date strings for the rolling week
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    // Fire all 8 requests concurrently instead of sequentially (was 3.5s, now ~0.5s)
    const [summaryRes, ...dailyResults] = await Promise.all([
      axios.get('https://wakatime.com/api/v1/users/current/stats', { headers }),
      ...dates.map((date) =>
        axios.get(
          `https://wakatime.com/api/v1/users/current/summaries?start=${date}&end=${date}`,
          { headers }
        )
      ),
    ]);

    const summaryData = summaryRes.data.data;
    const daily = dailyResults.map((r, i) => ({
      date: dates[i],
      hours: +((r.data.data[0]?.grand_total?.total_seconds ?? 0) / 3600).toFixed(2),
    }));

    const result = {
      data: {
        total_seconds: summaryData.total_seconds,
        languages: summaryData.languages,
        daily,
      },
    };

    setCache('wakatime-stats', result);
    res.json(result);
  } catch (err) {
    console.error('WakaTime error:', err?.response?.data || err.message);
    res.status(500).json({ error: err?.response?.data?.error || err.message });
  }
});

// ─── AI CHAT ─────────────────────────────────────────────────────────────────
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long. Please keep it under 500 characters.' });
  }

  const userText = message.trim();

  // Build context relevant to this specific question
  const context = buildContext(userText);
  const systemPrompt = buildSystemPrompt(context);

  // Last 4 messages (2 conversation turns) for multi-turn awareness
  const historyMessages = history.slice(-4).map((msg) => ({
    role: msg.user ? 'user' : 'assistant',
    content: String(msg.text),
  }));

  try {
    if (!process.env.GROQ_API_KEY) {
      // No API key configured — fall back to deterministic responses
      return res.json({ reply: getFallbackResponse(userText) });
    }

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 250,
        temperature: 0.65,
        messages: [
          { role: 'system', content: systemPrompt },
          ...historyMessages,
          { role: 'user', content: userText },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.json().catch(() => ({}));
      console.error('Groq API error:', groqRes.status, errBody);
      // Degrade gracefully — serve knowledge-base response instead of erroring
      return res.json({ reply: getFallbackResponse(userText) });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.json({ reply: getFallbackResponse(userText) });
    }

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    // Network error or timeout — fall back gracefully
    res.json({ reply: getFallbackResponse(userText) });
  }
});

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
