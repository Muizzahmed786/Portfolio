import Navbar from './components/Navbar.jsx';
import PixelSnow from './components/PixelSnow.jsx';

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
                
                <PixelSnow 
                    color="rgba(242, 240, 232, 0.4)"
                    flakeSize={0.01}
                    minFlakeSize={1.25}
                    pixelResolution={200}
                    speed={1.25}
                    density={0.3}
                    direction={125}
                    brightness={1}
                    className="fixed inset-0 z-0 pointer-events-none"
                />
                
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
