import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personal } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import BentoCard from '../components/BentoCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <section id="contact" className="portfolio-section pb-24 md:pb-32">
            <div className="content-container">
            
                <SectionHeader
                    index="05"
                    label="CONNECTION"
                    title="LET'S CONNECT"
                    subtitle="Currently seeking full-stack engineering roles, systems research, and high-impact software projects."
                />

                <Reveal delay={0.15}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Primary CTA Card (7 cols) */}
                        <div className="col-span-1 lg:col-span-7 flex">
                            <BentoCard 
                                className="w-full flex flex-col justify-between p-8 md:p-12 min-h-[380px]" 
                                featured={true}
                            >
                                <div className="space-y-5 max-w-lg">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/[0.08] border border-accent/25 text-accent font-mono text-[10px] tracking-widest uppercase">
                                        <MessageSquare size={12} />
                                        <span>INBOX OPEN</span>
                                    </div>

                                    <h3 className="editorial-heading text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-[0.9]">
                                        START A<br/>CONVERSATION.
                                    </h3>

                                    <p className="text-sm md:text-base text-text-secondary font-body font-light leading-relaxed">
                                        Have an opportunity, an ambitious product, or an interesting engineering problem? Feel free to reach out. I typically respond within 24 hours.
                                    </p>
                                </div>
                                
                                <div className="pt-8 mt-6 border-t border-white/[0.08] space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <a 
                                            href={`mailto:${personal.email}`}
                                            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(245,197,24,0.3)] hover:shadow-[0_6px_25px_rgba(245,197,24,0.45)] hover:-translate-y-0.5"
                                        >
                                            <Send size={15} />
                                            <span>SEND AN EMAIL</span>
                                        </a>

                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-accent/40 text-text-primary font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                                        >
                                            {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                                            <span>{copied ? "COPIED TO CLIPBOARD" : "COPY ADDRESS"}</span>
                                        </button>
                                    </div>

                                    <p className="font-mono text-[11px] text-text-muted flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                        <span>Direct channel: {personal.email}</span>
                                    </p>
                                </div>
                            </BentoCard>
                        </div>

                        {/* Combined Directory Info Card (5 cols) */}
                        <div className="col-span-1 lg:col-span-5 flex">
                            <BentoCard className="w-full flex flex-col justify-between p-8 md:p-10 min-h-[380px]">
                                <div className="space-y-6">
                                    <span className="font-mono text-xs text-accent uppercase tracking-widest block">
                                        // DIRECTORY & CHANNELS
                                    </span>
                                    
                                    <div className="space-y-3.5">
                                        {/* Location */}
                                        <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5">
                                            <div className="p-2.5 rounded-md bg-accent/[0.08] text-accent border border-accent/20">
                                                <MapPin size={16} />
                                            </div>
                                            <div>
                                                <span className="font-mono text-[10px] text-text-muted uppercase block">Location</span>
                                                <span className="font-mono text-xs text-text-primary font-semibold">{personal.location}</span>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <a 
                                            href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                                            className="p-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent/30 flex items-center justify-between transition-colors group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2.5 rounded-md bg-accent/[0.08] text-accent border border-accent/20">
                                                    <Phone size={16} />
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] text-text-muted uppercase block">Phone / WhatsApp</span>
                                                    <span className="font-mono text-xs text-text-primary group-hover:text-accent font-semibold transition-colors">{personal.phone}</span>
                                                </div>
                                            </div>
                                            <ExternalLink size={12} className="text-text-muted group-hover:text-accent transition-colors" />
                                        </a>

                                        {/* Email */}
                                        <a 
                                            href={`mailto:${personal.email}`}
                                            className="p-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent/30 flex items-center justify-between transition-colors group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="p-2.5 rounded-md bg-accent/[0.08] text-accent border border-accent/20">
                                                    <Mail size={16} />
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] text-text-muted uppercase block">Electronic Mail</span>
                                                    <span className="font-mono text-xs text-text-primary group-hover:text-accent font-semibold transition-colors truncate max-w-[180px] sm:max-w-none block">{personal.email}</span>
                                                </div>
                                            </div>
                                            <ExternalLink size={12} className="text-text-muted group-hover:text-accent transition-colors" />
                                        </a>
                                    </div>
                                </div>
                                
                                {/* Social Profiles Grid */}
                                <div className="pt-6 border-t border-white/[0.08] mt-6">
                                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block mb-3">
                                        PUBLIC NETWORKS
                                    </span>
                                    <div className="grid grid-cols-2 gap-3">
                                        <a 
                                            href={personal.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-accent/[0.08] hover:border-accent/40 flex items-center justify-between transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-2.5 text-text-secondary group-hover:text-accent">
                                                <FaGithub size={16} />
                                                <span className="font-mono text-xs font-semibold text-text-primary group-hover:text-accent">GitHub</span>
                                            </div>
                                            <ExternalLink size={11} className="text-text-muted group-hover:text-accent" />
                                        </a>

                                        <a 
                                            href={personal.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-accent/[0.08] hover:border-accent/40 flex items-center justify-between transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-2.5 text-text-secondary group-hover:text-accent">
                                                <FaLinkedinIn size={16} />
                                                <span className="font-mono text-xs font-semibold text-text-primary group-hover:text-accent">LinkedIn</span>
                                            </div>
                                            <ExternalLink size={11} className="text-text-muted group-hover:text-accent" />
                                        </a>
                                    </div>
                                </div>
                            </BentoCard>
                        </div>
                    </div>
                </Reveal>

            </div>
        </section>
    );
};

export default Contact;