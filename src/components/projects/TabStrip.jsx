import React from 'react';
import FolderTab from './FolderTab.jsx';
import { projects } from '../../data/portfolio.js';
import Reveal from '../Reveal.jsx';

const TabStrip = ({ onTabClick }) => {
    return (
        <section id="projects" className="relative z-0 min-h-screen flex flex-col bg-[#181818]">
            {/* Slim nav bar area (if not handled by global Navbar) */}
            <div className="w-full h-16 flex items-center justify-center border-b border-white/10">
                <span className="font-bold uppercase tracking-widest text-sm text-[#F2F2EE]" style={{ fontFamily: 'var(--font-body)' }}>
                    Muizz Ahmed
                </span>
                <a href="#about" className="absolute right-6 md:right-12 text-[#F2F2EE] font-bold uppercase tracking-widest text-xs hover:text-white/70 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                    About
                </a>
            </div>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col flex-1">
                {/* Hero Intro */}
                <div className="pt-24 pb-32 max-w-3xl">
                    <Reveal>
                        <h2 className="text-[#F2F2EE] text-4xl md:text-5xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            Selected Work
                        </h2>
                        <p className="mt-8 text-xl md:text-2xl text-[#F2F2EE]/70 leading-relaxed font-light" style={{ fontFamily: 'var(--font-source-serif)' }}>
                            A collection of my recent projects, exploring web development, systems thinking, and interactive experiences.
                        </p>
                    </Reveal>
                </div>

                {/* Tab Strip */}
                <div className="mt-auto w-full flex flex-nowrap items-end overflow-x-auto no-scrollbar pb-[1px] gap-2">
                    {projects.map((project) => (
                        <FolderTab 
                            key={project.id}
                            project={project}
                            onClick={onTabClick}
                            className="flex-1 min-w-[120px] max-w-[200px]"
                        />
                    ))}
                </div>
            </div>
            {/* Base line for tabs */}
            <div className="w-full h-[2px] bg-white/10 mt-[-1px]"></div>
        </section>
    );
};

export default TabStrip;
