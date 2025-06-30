import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilePlus } from 'lucide-react';

const Contact = () => {
  const [wordCount, setWordCount] = useState(0);
  const [fileError, setFileError] = useState(null);

  const handleMessageChange = (e) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length; // ✅ Always count words
    setWordCount(words); // ✅ Update count regardless of limit
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

        <div className="p-1 rounded-lg bg-gradient-to-r from-pink-500 via-yellow-500 to-indigo-500">
          <form
            action="https://formsubmit.co/b3njaminbaya@gmail.com"
            method="POST"
            encType="multipart/form-data"
            className="bg-white shadow-md rounded-lg p-8"
          >
            {/* Anti-bot hidden input */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_next" value="https://benjamin-mweri-baya.vercel.app/thanks" />

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Benjamin Baya" 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com" 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Your message here..." 
                onChange={handleMessageChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-400"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">{`Word count: ${wordCount}/800`}</p>
              {/* ✅ Word count warning */}
              {wordCount > 800 && (
                <p className="text-red-500 text-sm mt-1">Message exceeds the 800-word limit.</p>
              )}
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
                disabled={fileError || wordCount > 800} 
                className={`font-semibold px-6 py-2 rounded shadow transition-colors ${fileError || wordCount > 800
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Add Client Intake Card Below */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5wB4BdJ-QwCgiV0e_rWxpubjcZTiLgDkt3AFh3B_VPCg7GA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 rounded-lg p-6 shadow-md text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <FilePlus className="text-indigo-600" size={20} />
              <span className="text-indigo-700 font-semibold text-lg">
                Need a website?
              </span>
            </div>
            <p className="text-gray-600">
              Fill in the client intake form at <span className="font-medium text-indigo-700">Tevexa Technologies Limited</span>.
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


