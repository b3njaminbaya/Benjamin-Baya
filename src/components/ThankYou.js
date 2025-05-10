import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you!</h1>
            <p className="text-gray-600 mb-6">Your message has been successfully sent. I’ll get back to you shortly.</p>
            <a
                href="/#contact"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline transition"
            >
                Back to site
            </a>
        </section>
    );
};

export default ThankYou;
