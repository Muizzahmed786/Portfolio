import React from 'react';
import Navbar from './components/Navbar.jsx';
import GlobalBackgroundVideo from './components/GlobalBackgroundVideo.jsx';
import GlobalBackgroundOverlay from './components/GlobalBackgroundOverlay.jsx';

import AboutMe from "./sections/AboutMe.jsx";
import Education from "./sections/Education.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from './sections/Contact.jsx';
import Footer from "./sections/Footer.jsx";

import './index.css';

const App = () => {
    return (
        <div className="relative w-full min-h-screen bg-bg text-text-primary font-body selection:bg-accent selection:text-black overflow-x-hidden">
            {/* Global Continuous Background Architecture */}
            <GlobalBackgroundVideo />
            <GlobalBackgroundOverlay />
            
            {/* Navigation Layer */}
            <Navbar />
            
            {/* Unified Main Content Canvas */}
            <main>
                <AboutMe />
                <Education />
                <Skills />
                <Projects />
                <Contact />
            </main>

            {/* Seamless Footer */}
            <Footer />
        </div>
    );
};

export default App;
