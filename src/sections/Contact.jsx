import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personal } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";

const Contact = () => {
    return (
        <section id="contact" className="text-text-primary min-h-screen scroll-mt-5 max-w-275 mx-auto px-6 md:px-12 py-16
         bg-bg flex flex-col justify-center">
            
            {/* Section Header */}
            <Reveal className="mb-16">
                <span className="section-eyebrow">
                    contact
                </span>
                <h2 className="section-heading mt-4">
                    Get In Touch
                </h2>
            </Reveal>

            {/* Dossier Terminal */}
            <Reveal delay={0.15}>
                <div className="max-w-3xl mx-auto w-full p-8 border border-border bg-surface rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-text-muted select-none">
                        COORD // 45.10.99
                    </div>

                    <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary mb-6 pb-4 border-b border-border">
                        // case dossier: inquiry portal
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Diagnostic Info */}
                        <div className="space-y-6">
                            {/* <p className="text-sm text-text-secondary leading-relaxed font-light font-body">
                                Transmissions received automatically. If you have inquiries regarding consulting, systems design, or full-stack integrations, launch the secure client below.
                            </p> */}

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-text-secondary font-mono text-xs">
                                    <MapPin size={14} className="text-accent" />
                                    <span>{personal.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-text-secondary font-mono text-xs">
                                    <Phone size={14} className="text-accent" />
                                    <span>{personal.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Actions */}
                        <div className="flex flex-col justify-center items-center gap-4 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                            <a 
                                href={`mailto:${personal.email}`}
                                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 border border-border bg-bg hover:bg-accent-muted text-text-primary hover:text-accent font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer"
                            >
                                <Send size={14} />
                                <span>Contact Me</span>
                            </a>
                            
                            <div className="font-mono text-[10px] text-text-secondary/60 uppercase text-center mt-2 flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                <span>comms rail secure // end-to-end</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

        </section>
    );
};

export default Contact;