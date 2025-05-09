import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import ThankYou from './components/ThankYou';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <ThankYou />
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </div>
  );
};

export default App;


