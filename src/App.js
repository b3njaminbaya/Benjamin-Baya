import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/thanks" element={<ThankYou />} />

        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <About />
                <Skills />
                <Projects />
                <Contact />
              </main>
              <Footer />
              <Chatbot />
              <ScrollToTop />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


