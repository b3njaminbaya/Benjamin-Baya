import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';


pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.min.js`;

const ResumeModal = ({ isOpen, onClose }) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                    >
                        <div
                            className="bg-white max-w-3xl w-full h-[90vh] rounded-xl shadow-xl overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 text-gray-600 hover:text-black z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="h-full overflow-y-auto bg-gray-100 p-4">
                                <div className="text-center text-gray-600 text-sm mb-2">
                                    If the resume doesn’t load,{' '}
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 underline"
                                    >
                                        click here to download
                                    </a>.
                                </div>

                                <div className="flex flex-col items-center">
                                    <Document
                                        file="/resume.pdf"
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        loading={<p>Loading PDF...</p>}
                                        error={<p>Could not load PDF.</p>}
                                    >
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                                width={window.innerWidth < 768 ? 320 : 600}
                                            />
                                        ))}
                                    </Document>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;


