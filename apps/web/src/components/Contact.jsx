import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import Container from './ui/Container';

const Contact = () => {
  const [wordCount, setWordCount] = useState(0);
  const [fileError, setFileError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleMessageChange = (e) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalid = files.find(f => f.size > 10 * 1024 * 1024);
    setFileError(invalid ? `${invalid.name} exceeds the 10 MB limit.` : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileError || wordCount > 800) return;

    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setWordCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500';

  const labelClass = 'block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200';

  return (
    <section id="contact" className="min-h-screen py-14 bg-gray-50 dark:bg-gray-900">
      <Container>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>

        {status === 'success' ? (
          <motion.div
            className="flex flex-col items-center gap-4 py-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="text-green-500" size={56} />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Message sent!</h3>
            <p className="text-gray-600 dark:text-gray-400">Thanks for reaching out — I'll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-px rounded-xl bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500">
              <form
                action="https://formsubmit.co/b3njaminbaya@gmail.com"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 space-y-5"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />

                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input id="name" type="text" name="name" required placeholder="Your name" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" type="email" name="email" required placeholder="you@example.com" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Your message here..."
                    onChange={handleMessageChange}
                    className={inputClass}
                  />
                  <p className={`text-xs mt-1 ${wordCount > 800 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
                    {wordCount} / 800 words
                  </p>
                </div>

                <div>
                  <label htmlFor="attachment" className={labelClass}>
                    Attachment <span className="font-normal text-gray-400 dark:text-gray-500">(max 10 MB)</span>
                  </label>
                  <input
                    id="attachment"
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 dark:file:bg-indigo-900/40 file:text-indigo-700 dark:file:text-indigo-300"
                  />
                  {fileError && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {fileError}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!!(fileError || wordCount > 800 || status === 'submitting')}
                  className={`w-full font-semibold py-2.5 rounded-lg transition-colors ${
                    fileError || wordCount > 800 || status === 'submitting'
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            <motion.a
              href="https://www.teevexa.com/start-project"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-xl p-5 transition-colors group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ExternalLink className="text-indigo-600 dark:text-indigo-400 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-indigo-700 dark:text-indigo-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                  Start a Project with Teevexa
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ready to build something? Work with us — end-to-end product development for startups and businesses.
                </p>
              </div>
            </motion.a>
          </motion.div>
        )}
      </div>
      </Container>
    </section>
  );
};

export default Contact;
