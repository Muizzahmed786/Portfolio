import React from 'react';
import { MapPin, Send } from 'lucide-react'; 
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import LightRays from '../animations/LightRays.jsx';
import { personal } from '../data/portfolio.js';
import Reveal from '../components/Reveal.jsx';
import BentoGrid from '../components/BentoGrid.jsx';
import BentoCard from '../components/BentoCard.jsx';

const AboutMe = () => {
    return (
        <section id='about' className='relative z-0 scroll-mt-5 bg-transparent overflow-hidden pt-24 pb-16'>
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12">
                <Reveal>
                    <BentoGrid>
                        {/* HERO CARD (Primary) */}
                        <BentoCard 
                            className="col-span-1 md:col-span-6 lg:col-span-8 min-h-[400px] justify-center" 
                            featured={true} 
                            noPadding={true}
                        >
                            {/* Subdued LightRays inside the card */}
                            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
                                    className="custom-rays opacity-50"
                                    pulsating={true}
                                    fadeDistance={1.2}
                                    saturation={0.7}
                                />
                            </div>

                            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center space-y-6">
                                <span className="section-eyebrow">// HELLO, I'M</span>
                                
                                <h1 className="hero-name editorial-heading text-6xl md:text-8xl lg:text-[90px] xl:text-[100px] text-text-primary uppercase mb-2 leading-none">
                                    MUIZZ<br />AHMED
                                </h1>
                                
                                <div className="space-y-2 pt-2">
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                                        {personal.role}
                                    </h2>
                                    <p className="text-sm md:text-base text-text-secondary font-light font-body max-w-lg leading-relaxed">
                                        {personal.bio}
                                    </p>
                                </div>
                            </div>
                        </BentoCard>

                        {/* UTILITY CARDS COLUMN */}
                        <div className="col-span-1 md:col-span-6 lg:col-span-4 flex flex-col gap-4 md:gap-6">
                            
                            {/* CURRENT STATUS */}
                            <BentoCard className="flex-1 flex flex-col justify-center">
                                <span className="section-eyebrow mb-2">// STATUS</span>
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                    </span>
                                    <span className="text-lg font-display font-bold text-text-primary">
                                        Building systems 🚀
                                    </span>
                                </div>
                            </BentoCard>

                            {/* LOCATION & SOCIALS ROW */}
                            <div className="flex gap-4 md:gap-6 flex-1">
                                <BentoCard className="flex-1 flex flex-col justify-center items-center text-center">
                                    <MapPin size={24} className="text-accent mb-2" />
                                    <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">Location</span>
                                    <span className="text-sm font-display font-bold text-text-primary mt-1">India</span>
                                </BentoCard>
                                
                                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex-1 block">
                                        <BentoCard className="h-full flex items-center justify-center hover:text-accent transition-colors" interactive={true}>
                                            <FaGithub size={24} />
                                        </BentoCard>
                                    </a>
                                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 block">
                                        <BentoCard className="h-full flex items-center justify-center hover:text-accent transition-colors" interactive={true}>
                                            <FaLinkedinIn size={24} />
                                        </BentoCard>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </BentoGrid>
                </Reveal>
            </div>
        </section>
    );
};

export default AboutMe;