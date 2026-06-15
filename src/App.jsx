import Navbar from './components/Navbar.jsx';

import AboutMe from "./sections/AboutMe.jsx"
import Contact from './sections/Contact.jsx';
import Education from "./sections/Education.jsx";
import Footer from "./sections/Footer.jsx";
import Projects from "./sections/Projects.jsx";
import Skills from "./sections/Skills.jsx";

import './index.css';

const App = () => {
    return(
            <div className='relative w-full min-h-screen bg-bg text-text-primary font-body selection:bg-accent selection:text-black overflow-x-hidden'>
        
                <div className="relative z-10">
                    <Navbar />
                    <main>
                        <AboutMe />
                        <Education />
                        <Skills />
                        <Projects />
                        <Contact />
                        <Footer />
                    </main>
                </div>
            </div>
    )
}

export default App
