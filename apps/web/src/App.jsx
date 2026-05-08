import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import StatsBar from './components/StatsBar';
import Experience from './components/Experience';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Resume from './components/Resume';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <ScrollProgress />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <main>
                <About />
                <StatsBar />
                <Experience />
                <Services />
                <Skills />
                <Projects />
                <Dashboard />
                <Contact />
              </main>
              <Footer />
              <Chatbot />
              <CommandPalette />
              <ScrollToTop />
            </>
          }
        />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
