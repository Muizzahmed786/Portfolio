import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react'; 
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import LightRays from '../animations/LightRays.jsx';
import { personal, projects, skills, education } from '../data/portfolio.js';
import Reveal from '../components/Reveal.jsx';
import BentoGrid from '../components/BentoGrid.jsx';
import BentoCard from '../components/BentoCard.jsx';

const Home = () => {
    const featuredProject = projects[0];

    return (
        <div className='relative z-0 pt-24 pb-16'>
            <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12">
                <Reveal>
                    <BentoGrid>
                        {/* HERO CARD (Primary) - 8 cols */}
                        <BentoCard 
                            className="col-span-1 md:col-span-8 min-h-[400px] flex flex-col justify-center relative group overflow-hidden" 
                            featured={true} 
                            noPadding={true}
                            interactive={true}
                        >
                            <Link to="/about" className="absolute inset-0 z-20 focus:outline-none" aria-label="About Me"></Link>
                            
                            {/* Subdued LightRays inside the card */}
                            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-md">
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
                                
                                <h1 className="hero-name editorial-heading text-5xl md:text-7xl lg:text-[90px] xl:text-[100px] text-text-primary uppercase mb-2 leading-none">
                                    MUIZZ<br />AHMED
                                </h1>
                                
                                <div className="space-y-4 pt-2">
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                                        {personal.role}
                                    </h2>
                                    <p className="text-sm md:text-base text-text-secondary font-light font-body max-w-lg leading-relaxed line-clamp-2">
                                        {personal.bio}
                                    </p>
                                    
                                    <div className="inline-flex items-center text-sm font-mono font-bold text-accent mt-4 group-hover:translate-x-1 transition-transform">
                                        VIEW ABOUT <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        </BentoCard>

                        {/* UTILITY CARDS - 4 cols */}
                        <div className="col-span-1 md:col-span-4 flex flex-col gap-4 md:gap-6">
                            
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
                                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex-1 block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md">
                                        <BentoCard className="h-full flex items-center justify-center hover:text-accent transition-colors" interactive={true}>
                                            <FaGithub size={24} />
                                        </BentoCard>
                                    </a>
                                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md">
                                        <BentoCard className="h-full flex items-center justify-center hover:text-accent transition-colors" interactive={true}>
                                            <FaLinkedinIn size={24} />
                                        </BentoCard>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* FEATURED PROJECT - 8 cols */}
                        <BentoCard className="col-span-1 md:col-span-8 flex flex-col justify-center p-8 relative group order-3 hover:border-accent/40 transition-colors" interactive={true}>
                            <Link to="/projects" className="absolute inset-0 z-20 focus:outline-none" aria-label="Featured Project"></Link>
                            <span className="section-eyebrow mb-4">// FEATURED PROJECT</span>
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
                                {featuredProject.title}
                            </h3>
                            <p className="text-text-secondary font-light max-w-xl line-clamp-2 mb-6">
                                {featuredProject.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {featuredProject.stack.slice(0, 3).map((tech, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-surface-2 text-text-secondary text-xs font-mono rounded-full border border-border">
                                        {tech}
                                    </span>
                                ))}
                                {featuredProject.stack.length > 3 && (
                                    <span className="px-3 py-1 bg-surface-2 text-text-secondary text-xs font-mono rounded-full border border-border">
                                        +{featuredProject.stack.length - 3}
                                    </span>
                                )}
                            </div>
                            <div className="inline-flex items-center text-sm font-mono font-bold text-text-primary group-hover:text-accent transition-colors">
                                VIEW PROJECT <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </BentoCard>

                        {/* PROJECTS - 4 cols */}
                        <BentoCard className="col-span-1 md:col-span-4 flex flex-col justify-between p-8 relative group order-4 hover:border-accent/40 transition-colors" interactive={true}>
                            <Link to="/projects" className="absolute inset-0 z-20 focus:outline-none" aria-label="All Projects"></Link>
                            <div>
                                <span className="section-eyebrow mb-4 block">// PROJECTS</span>
                                <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-2">
                                    0{projects.length}
                                </h3>
                                <div className="text-xl font-display text-text-secondary">
                                    Selected Works
                                </div>
                                <ul className="mt-6 space-y-2">
                                    {projects.slice(0, 3).map((p, i) => (
                                        <li key={i} className="text-sm font-mono text-text-muted truncate">
                                            {p.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="inline-flex items-center text-sm font-mono font-bold text-text-primary group-hover:text-accent transition-colors mt-8">
                                VIEW ALL <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </BentoCard>

                        {/* SKILLS - 12 cols */}
                        <BentoCard className="col-span-1 md:col-span-12 p-8 relative group hover:border-accent/40 transition-colors" interactive={true}>
                            <Link to="/skills" className="absolute inset-0 z-20 focus:outline-none" aria-label="Skills"></Link>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <span className="section-eyebrow mb-4 block">// STACK</span>
                                    <div className="flex flex-wrap gap-2 md:gap-3 max-w-3xl">
                                        {skills[1].items.slice(0, 5).concat(skills[0].items.slice(0, 3)).map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1.5 md:px-4 md:py-2 bg-surface-2 text-text-primary text-sm font-mono rounded-md border border-border">
                                                {skill}
                                            </span>
                                        ))}
                                        <span className="px-3 py-1.5 md:px-4 md:py-2 text-text-secondary text-sm font-mono">
                                            ...and more
                                        </span>
                                    </div>
                                </div>
                                <div className="inline-flex items-center text-sm font-mono font-bold text-text-primary group-hover:text-accent transition-colors shrink-0">
                                    VIEW FULL STACK <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </BentoCard>

                        {/* EDUCATION - 6 cols */}
                        <BentoCard className="col-span-1 md:col-span-6 p-8 relative group hover:border-accent/40 transition-colors flex flex-col justify-between" interactive={true}>
                            <Link to="/education" className="absolute inset-0 z-20 focus:outline-none" aria-label="Education"></Link>
                            <div>
                                <span className="section-eyebrow mb-4 block">// EDUCATION</span>
                                <h3 className="text-2xl font-display font-bold text-text-primary mb-2 line-clamp-1">
                                    {education[0].degree}
                                </h3>
                                <p className="text-text-secondary mb-4 line-clamp-1">{education[0].institution}</p>
                                
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-4xl font-display font-bold text-accent leading-none">{education[0].cgpa}</span>
                                    <span className="text-sm font-mono text-text-muted pb-1">CGPA</span>
                                </div>
                            </div>
                            
                            <div className="inline-flex items-center text-sm font-mono font-bold text-text-primary group-hover:text-accent transition-colors">
                                VIEW EDUCATION <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </BentoCard>

                        {/* ABOUT / CONTACT - 6 cols */}
                        <BentoCard className="col-span-1 md:col-span-6 p-8 relative group hover:border-accent/40 transition-colors flex flex-col justify-center items-center text-center bg-accent-muted border-accent/20" interactive={true}>
                            <Link to="/contact" className="absolute inset-0 z-20 focus:outline-none" aria-label="Contact"></Link>
                            <span className="section-eyebrow mb-4 block">// CONTACT</span>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
                                LET'S BUILD<br/>SOMETHING.
                            </h3>
                            <div className="inline-flex items-center text-sm font-mono font-bold text-accent group-hover:text-text-primary transition-colors">
                                START A CONVERSATION <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </BentoCard>

                    </BentoGrid>
                </Reveal>
            </div>
        </div>
    );
};

export default Home;
