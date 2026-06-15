import React from 'react';
import { FileText } from 'lucide-react'; 
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import LightRays from '../animations/LightRays.jsx';
import { personal } from '../data/portfolio.js';
import Reveal from '../components/Reveal.jsx';

const AboutMe = () => {
    return (
        <section id='about' className='relative min-h-screen z-0 scroll-mt-5 bg-bg overflow-hidden flex items-center'>
            {/* Background Animation Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#f5c518"
                    raysSpeed={0.5}
                    lightSpread={0.6}
                    rayLength={2.0}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.05}
                    distortion={0.05}
                    className="custom-rays opacity-85"
                    pulsating={true}
                    fadeDistance={1.2}
                    saturation={0.7}
                />
            </div>

            <div className="relative z-10 text-text-primary w-full max-w-275 mx-auto px-6 md:px-12 py-16 flex flex-col justify-center items-center text-center">
                
                <Reveal className="space-y-6 max-w-3xl flex flex-col items-center">
                    <span className="section-eyebrow">
                        about-me
                    </span>
                    
                    <h1 className="hero-name font-display text-text-primary tracking-[-0.03em] font-extrabold leading-none uppercase pt-2" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
                        Hi, I'm {personal.name}
                    </h1>
                    
                    <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light font-body max-w-2xl mx-auto">
                        {personal.bio}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                        <a 
                            href="/muizz-resume.pdf" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-sm hover:border-accent hover:bg-accent-muted text-text-primary hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-200 group"
                        >
                            <FileText size={14} className="group-hover:scale-110 transition-transform duration-200" />
                            <span>resume</span>
                        </a>

                        <a 
                            href={personal.github} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-sm hover:border-accent hover:bg-accent-muted text-text-primary hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-200 group"
                        >
                            <FaGithub size={14} className="group-hover:scale-110 transition-transform duration-200" />
                            <span>github</span>
                        </a>

                        <a 
                            href={personal.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-border rounded-sm hover:border-accent hover:bg-accent-muted text-text-primary hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-200 group"
                        >
                            <FaLinkedinIn size={14} className="group-hover:scale-110 transition-transform duration-200" />
                            <span>linkedin</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default AboutMe;