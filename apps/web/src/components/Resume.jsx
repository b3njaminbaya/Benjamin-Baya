import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Resume = () => {
  const pdfPath = '/resume.pdf';

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top bar */}
      <motion.div
        className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Open in new tab</span>
            <span className="sm:hidden">New tab</span>
          </a>
          <a
            href={pdfPath}
            download="Benjamin_Mweri_Baya_Resume.pdf"
            className="flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download size={14} />
            Download
          </a>
        </div>
      </motion.div>

      {/* Mobile fallback hint — shown only on small screens where iframe may not render */}
      <div className="sm:hidden bg-indigo-950/60 border-b border-indigo-900/50 px-4 py-2.5 text-xs text-indigo-300 text-center leading-relaxed">
        If the preview doesn't load on your device, use <strong>Download</strong> or <strong>New tab</strong> above.
      </div>

      {/* PDF iframe — works on desktop and Android Chrome; iOS Safari uses the buttons above */}
      <div className="flex-1 relative">
        <iframe
          src={pdfPath}
          title="Benjamin Mweri Baya — Resume"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default Resume;
