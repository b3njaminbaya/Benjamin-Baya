// Portfolio knowledge base — single source of truth for the chatbot.
// Update this file when skills, projects, or contact info changes.

const PORTFOLIO = {
  identity: {
    name: 'Benjamin Mweri Baya',
    title: 'Software Engineer & Founder',
    location: 'Kenya',
    email: 'b3njaminbaya@gmail.com',
    phone: '+254 783 797132',
    github: 'https://github.com/benjaminmweribaya',
    linkedin: 'https://linkedin.com/in/benjamin-mweri-baya',
    portfolio: 'https://benjaminbaya.com',
  },

  bio: `Benjamin Mweri Baya is a software engineer and founder based in Kenya. He designs and builds modern digital products: custom websites, web applications, mobile apps, business systems, and SaaS platforms — for startups, companies, and ambitious teams. He founded Teevexa, a product development studio, to bring enterprise-quality software development within reach of growing businesses. His background includes a B.Eng in Chemical Engineering from the Technical University of Kenya and professional Full-Stack training from Moringa School. That engineering mindset shapes how he approaches software: systems-first, scalable by default, built to last.`,

  teevexa: {
    name: 'Teevexa',
    website: 'https://www.teevexa.com',
    startProject: 'https://www.teevexa.com/start-project',
    description: 'A product development studio providing end-to-end development services — from architecture and design through to deployment and ongoing maintenance.',
    services: [
      'Custom websites and landing pages',
      'Web applications and SaaS platforms',
      'Mobile apps (Flutter, React Native)',
      'Business systems and internal tools',
      'API design and backend development',
      'Ongoing maintenance and scaling',
    ],
  },

  skills: {
    frontend: [
      { name: 'JavaScript', level: 'core' },
      { name: 'TypeScript', level: 'core' },
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Tailwind CSS', level: 'proficient' },
    ],
    backend: [
      { name: 'Python', level: 'core' },
      { name: 'Flask', level: 'core' },
      { name: 'Node.js', level: 'core' },
      { name: 'Laravel', level: 'core' },
      { name: 'Spring Boot', level: 'proficient' },
    ],
    mobile: [
      { name: 'Flutter', level: 'core' },
      { name: 'React Native', level: 'proficient' },
      { name: 'Firebase', level: 'core' },
      { name: 'Supabase', level: 'proficient' },
    ],
    databases: [
      { name: 'PostgreSQL', level: 'core' },
      { name: 'MySQL', level: 'core' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'SQLite', level: 'proficient' },
    ],
  },

  projects: [
    {
      name: 'Taskly',
      description: 'Real-time collaborative task management application with live updates via WebSocket.',
      tech: ['React', 'Vite', 'Flask', 'PostgreSQL', 'WebSocket'],
      url: 'https://taskly-app-iota.vercel.app',
      highlights: 'Real-time sync, drag-and-drop, team workspaces',
    },
    {
      name: 'Micro-Donations Platform',
      description: 'M-Pesa-integrated giving platform for education, healthcare, and environmental causes.',
      tech: ['React', 'Flask', 'PostgreSQL', 'M-Pesa API'],
      highlights: 'M-Pesa STK push, cause tracking, donor dashboards',
    },
    {
      name: 'Becof E-Commerce & Consulting',
      description: 'Full e-commerce platform with expert consultation booking and M-Pesa payments.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'M-Pesa API'],
      highlights: 'Product catalog, booking system, payment integration',
    },
    {
      name: 'Turkana Tech Youths Hub',
      description: 'Community platform for donations and volunteer matching serving Turkana County.',
      tech: ['React', 'Flask', 'PostgreSQL', 'M-Pesa'],
      highlights: 'Volunteer matching, M-Pesa donations, community events',
    },
    {
      name: 'Eco Home Guide',
      description: 'Energy savings calculator with interactive data visualizations.',
      tech: ['JavaScript', 'Chart.js'],
      url: 'https://eco-home-guide.vercel.app',
      highlights: 'Energy audit tool, savings projections, interactive charts',
    },
  ],

  education: [
    {
      degree: 'B.Eng Chemical Engineering',
      institution: 'Technical University of Kenya',
      note: 'Systems-thinking and engineering rigour that informs software architecture decisions.',
    },
    {
      degree: 'Full-Stack Web Development',
      institution: 'Moringa School',
      note: 'Professional training in modern web development.',
    },
  ],

  availability: 'Open to full-time roles, freelance contracts, and project-based work. For Teevexa project inquiries, visit teevexa.com/start-project.',
};

// ─── CONTEXT BUILDER ─────────────────────────────────────────────────────────
// Detects intent from the user message and returns relevant context sections.
// Injecting focused context keeps token usage low and responses more accurate.

function buildContext(message) {
  const lower = message.toLowerCase();
  const sections = [];

  // Identity is always included as a base
  sections.push(`IDENTITY: ${PORTFOLIO.identity.name} — ${PORTFOLIO.identity.title}, based in ${PORTFOLIO.identity.location}.`);

  const want = (pattern) => pattern.test(lower);

  if (want(/skill|tech|stack|language|framework|know|use|built with|experience with|what can you/)) {
    const s = PORTFOLIO.skills;
    const fmt = (arr) => arr.map(x => `${x.name} (${x.level})`).join(', ');
    sections.push(
      `SKILLS:\n` +
      `  Frontend: ${fmt(s.frontend)}\n` +
      `  Backend: ${fmt(s.backend)}\n` +
      `  Mobile: ${fmt(s.mobile)}\n` +
      `  Databases: ${fmt(s.databases)}`
    );
  }

  if (want(/project|work|built|made|portfolio|app|website|demo|show me|example|taskly|donation|becof|turkana|eco/)) {
    const lines = PORTFOLIO.projects.map(p => {
      const link = p.url ? ` — ${p.url}` : '';
      return `  • ${p.name}: ${p.description} Tech: ${p.tech.join(', ')}${link}`;
    });
    sections.push(`PROJECTS:\n${lines.join('\n')}`);
  }

  if (want(/teevexa|company|studio|service|help me build|start project|hire.*build|build.*for me|work together|collaborate|client/)) {
    sections.push(
      `TEEVEXA (product development studio):\n` +
      `  Website: ${PORTFOLIO.teevexa.website}\n` +
      `  Start a project: ${PORTFOLIO.teevexa.startProject}\n` +
      `  Services: ${PORTFOLIO.teevexa.services.join(', ')}\n` +
      `  ${PORTFOLIO.teevexa.description}`
    );
  }

  if (want(/contact|reach|email|phone|whatsapp|get in touch|available|hire|work with you|linkedin|github/)) {
    const c = PORTFOLIO.identity;
    sections.push(
      `CONTACT:\n` +
      `  Email: ${c.email}\n` +
      `  WhatsApp: ${c.phone}\n` +
      `  GitHub: ${c.github}\n` +
      `  LinkedIn: ${c.linkedin}\n` +
      `  Availability: ${PORTFOLIO.availability}`
    );
  }

  if (want(/education|degree|study|university|moringa|background|qualif|certif/)) {
    const lines = PORTFOLIO.education.map(e => `  • ${e.degree} — ${e.institution}. ${e.note}`);
    sections.push(`EDUCATION:\n${lines.join('\n')}`);
  }

  if (want(/about|who are you|yourself|story|founder|engineer|tell me/)) {
    sections.push(`BIO: ${PORTFOLIO.bio}`);
  }

  // If only identity was added, include bio as default context
  if (sections.length === 1) {
    sections.push(`BIO: ${PORTFOLIO.bio}`);
    sections.push(`AVAILABILITY: ${PORTFOLIO.availability}`);
  }

  return sections.join('\n\n');
}

// ─── SYSTEM PROMPT ───────────────────────────────────────────────────────────

function buildSystemPrompt(context) {
  return `You are the portfolio assistant for Benjamin Mweri Baya. Respond in first person on his behalf — use "I", not "he". Be warm, direct, and concise (under 120 words). Sound like a confident, senior engineer, not a formal bot.

Guidelines:
- Only answer using the context provided below. Do not invent details.
- For project inquiries or client work, point to: https://www.teevexa.com/start-project
- For direct contact: b3njaminbaya@gmail.com or WhatsApp +254 783 797132
- If asked something not in the context, say so honestly and suggest reaching out directly.
- Mention Teevexa naturally when relevant to services or project work.

CONTEXT:
${context}`;
}

// ─── DETERMINISTIC FALLBACK ──────────────────────────────────────────────────
// Used when the LLM API is unavailable. Covers the most common queries.

const FALLBACKS = {
  skills: `I work across the full stack — JavaScript, TypeScript, React, and Next.js on the frontend; Python, Flask, Node.js, Laravel, and Spring Boot on the backend; Flutter and React Native for mobile; and PostgreSQL, MySQL, MongoDB for databases.`,

  projects: `My portfolio includes Taskly (real-time task management), a Micro-Donations Platform with M-Pesa integration, Becof E-Commerce, the Turkana Tech Youths Hub, and Eco Home Guide. Each project is linked on my Projects page — want me to highlight any specific one?`,

  teevexa: `Through Teevexa, my product development studio, we deliver end-to-end software — from architecture and design through to deployment. We build websites, web apps, mobile apps, and SaaS platforms. Start a conversation at teevexa.com/start-project.`,

  contact: `You can reach me at b3njaminbaya@gmail.com or via WhatsApp at +254 783 797132. There's also a contact form on this site. I'm currently open to new work — both direct and through Teevexa.`,

  bio: `I'm Benjamin Mweri Baya — a software engineer and founder based in Kenya. I build modern digital products for startups and businesses, and I founded Teevexa, a product development studio. My background is a B.Eng in Chemical Engineering plus professional Full-Stack training at Moringa School.`,

  github: `My GitHub is github.com/benjaminmweribaya — you'll find my open-source work and project repos there.`,

  default: `I'm Benjamin's portfolio assistant. Ask me about his skills, projects, experience, or how to work with him — individually or through Teevexa. What would you like to know?`,
};

function getFallbackResponse(message) {
  const lower = message.toLowerCase();
  if (/skill|tech|stack|framework|language/.test(lower)) return FALLBACKS.skills;
  if (/project|work|built|made|app|website/.test(lower)) return FALLBACKS.projects;
  if (/teevexa|service|studio|build for|client/.test(lower)) return FALLBACKS.teevexa;
  if (/contact|email|reach|hire|phone|whatsapp|touch/.test(lower)) return FALLBACKS.contact;
  if (/about|who|yourself|background|story/.test(lower)) return FALLBACKS.bio;
  if (/github|repo|code/.test(lower)) return FALLBACKS.github;
  return FALLBACKS.default;
}

module.exports = { buildContext, buildSystemPrompt, getFallbackResponse };
