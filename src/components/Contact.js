import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [wordCount, setWordCount] = useState(0);
  const [fileError, setFileError] = useState(null);

  const handleMessageChange = (e) => {
    const words = e.target.value.trim().split(/\s+/).length;
    if (words <= 800) {
      setWordCount(words);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidFile = files.find((file) => file.size > 10 * 1024 * 1024);
    setFileError(invalidFile ? `${invalidFile.name} exceeds the 10MB limit.` : null);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2
          className="text-4xl font-bold text-center text-indigo-600 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>

        <form
          action="https://formsubmit.co/b3njaminbaya@gmail.com" // Replace with your real email
          method="POST"
          encType="multipart/form-data"
          className="bg-white shadow-md rounded-lg p-8"
        >
          {/* Anti-bot hidden input */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_next" value="https://yourwebsite.com/thanks" />

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              onChange={handleMessageChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">{`Word count: ${wordCount}/800`}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Attachments (Max 10MB each)</label>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

