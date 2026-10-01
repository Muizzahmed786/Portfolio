import React from 'react';
import { MapPin, ArrowDown, FileText, Send, Sparkles, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { personal } from '../data/portfolio.js';
import Reveal from '../components/Reveal.jsx';

const AboutMe = () => {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="about" className="portfolio-section pt-28 md:pt-36 pb-20 md:pb-28">
            <div className="content-container">

                {/* Standardized Eyebrow */}
                <Reveal delay={0}>
                    <div className="flex items-center gap-2.5 mb-6">
                        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                            // 01
                        </span>
                        <span className="w-5 h-[1px] bg-accent/40" />
                        <span className="font-mono text-xs text-text-secondary tracking-[0.16em] uppercase">
                            Identity
                        </span>
                    </div>
                </Reveal>

                {/* Main two-column layout */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">

                    {/* LEFT — Name + Bio */}
                    <div className="flex-1 max-w-2xl">
                        <Reveal delay={0.05}>
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/[0.08] border border-accent/25 text-accent font-mono text-[10px] tracking-widest uppercase">
                                    <Sparkles size={11} />
                                    <span>Full-Stack Engineer</span>
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="hero-name editorial-heading text-[clamp(3.8rem,9vw,7rem)] text-text-primary uppercase tracking-tight leading-[0.88] select-none mb-6">
                                MUIZZ<br />AHMED
                            </h1>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p className="text-base sm:text-lg font-display font-medium text-text-primary mb-2">
                                {personal.role} <span className="text-accent font-mono">// MIT Manipal</span>
                            </p>
                            <p className="text-sm md:text-base text-text-secondary font-light font-body leading-relaxed max-w-xl">
                                {personal.bio}
                            </p>
                        </Reveal>

                        {/* CTA Buttons */}
                        <Reveal delay={0.2}>
                            <div className="flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-white/[0.08]">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('projects')}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(245,197,24,0.3)] hover:shadow-[0_6px_25px_rgba(245,197,24,0.45)] hover:-translate-y-0.5"
                                >
                                    <span>EXPLORE PROJECTS</span>
                                    <ArrowDown size={14} />
                                </button>

                                <a
                                    href="/muizz-resume-wo.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-accent/40 text-text-primary hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-200"
                                >
                                    <FileText size={14} />
                                    <span>RESUME</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection('contact')}
                                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                    <Send size={13} />
                                    <span>CONTACT</span>
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT — Location + Social */}
                    <Reveal delay={0.25}>
                        <div className="flex flex-col gap-6 lg:items-end lg:text-right">

                            {/* Location */}
                            <div className="flex items-center gap-2.5 text-text-secondary">
                                <MapPin size={15} className="text-accent/80 shrink-0" />
                                <div>
                                    <p className="text-sm font-body text-text-primary font-medium">{personal.location}</p>
                                    <p className="text-[11px] font-mono text-text-muted mt-0.5">IST &bull; UTC+5:30</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full lg:w-36 bg-white/[0.08]" />

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                <a
                                    href={personal.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200"
                                >
                                    <FaGithub size={18} className="group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-mono text-xs tracking-wide">GitHub</span>
                                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>

                                <span className="text-text-muted/30 text-xs">·</span>

                                <a
                                    href={personal.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200"
                                >
                                    <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-mono text-xs tracking-wide">LinkedIn</span>
                                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
};

export default AboutMe;