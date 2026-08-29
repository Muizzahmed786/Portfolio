import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personal } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import BentoGrid from '../components/BentoGrid.jsx';
import BentoCard from '../components/BentoCard.jsx';

const Contact = () => {
    return (
        <section id="contact" className="relative z-0 scroll-mt-5 bg-transparent overflow-hidden py-16 pb-32">
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12">
            
            <Reveal className="mb-10">
                <span className="section-eyebrow">
                    contact
                </span>
                <h2 className="editorial-heading text-4xl md:text-5xl mt-2 text-text-primary">
                    LET'S CONNECT
                </h2>
            </Reveal>

            <Reveal delay={0.15}>
                <BentoGrid>
                    {/* Primary CTA Card */}
                    <BentoCard className="col-span-1 md:col-span-12 lg:col-span-8 flex flex-col justify-between min-h-[300px]" featured={true}>
                        <div className="space-y-4 max-w-lg">
                            <h3 className="editorial-heading text-5xl md:text-6xl text-text-primary">
                                START A<br/>CONVERSATION.
                            </h3>
                            <p className="text-sm md:text-base text-text-secondary font-body font-light">
                                Available for opportunities, system design discussions, or just to say hi. My inbox is always open.
                            </p>
                        </div>
                        
                        <div className="pt-8 mt-auto">
                            <a 
                                href={`mailto:${personal.email}`}
                                className="inline-flex items-center gap-3 px-8 py-4 border border-border bg-bg hover:bg-accent-muted text-text-primary hover:text-accent font-display text-sm uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer"
                            >
                                <Send size={16} />
                                <span>CONTACT ME</span>
                            </a>
                        </div>
                    </BentoCard>

                    {/* Combined Info Card */}
                    <BentoCard className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <span className="section-eyebrow block">
                                    // DIRECTORY
                                </span>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-text-primary font-mono text-xs">
                                        <div className="p-2 border border-border bg-bg rounded-sm text-text-secondary">
                                            <MapPin size={16} />
                                        </div>
                                        <span className="tracking-wide">{personal.location}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-text-primary font-mono text-xs">
                                        <div className="p-2 border border-border bg-bg rounded-sm text-text-secondary">
                                            <Phone size={16} />
                                        </div>
                                        <span className="tracking-wide">{personal.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-text-primary font-mono text-xs">
                                        <div className="p-2 border border-border bg-bg rounded-sm text-text-secondary">
                                            <Mail size={16} />
                                        </div>
                                        <span className="tracking-wide">{personal.email}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Socials embedded within Info Card */}
                            <div className="pt-6 border-t border-border flex gap-3">
                                <a 
                                    href={personal.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 border border-border bg-bg hover:bg-accent-muted text-text-secondary hover:text-accent rounded-sm transition-colors duration-200"
                                >
                                    <FaGithub size={18} />
                                </a>
                                <a 
                                    href={personal.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 border border-border bg-bg hover:bg-accent-muted text-text-secondary hover:text-accent rounded-sm transition-colors duration-200"
                                >
                                    <FaLinkedinIn size={18} />
                                </a>
                            </div>
                        </div>
                    </BentoCard>
                </BentoGrid>
            </Reveal>

            </div>
        </section>
    );
};

export default Contact;