import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personal } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import SoftAurora from "../animations/SoftAurora.jsx";

const Contact = () => {
    return (
        <section id="contact" className="relative min-h-screen z-0 scroll-mt-5 bg-bg overflow-hidden flex items-center">
            {/* Background Animation Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <SoftAurora
                    speed={0.25}
                    scale={1.4}
                    brightness={0.7}
                    color1="#f5c518"
                    color2="#806000"
                    enableMouseInteraction={true}
                    mouseInfluence={0.12}
                />
            </div>

            <div className="relative z-10 text-text-primary w-full max-w-275 mx-auto px-6 md:px-12 py-16 flex flex-col justify-center">
            
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
                                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 border border-border bg-bg hover:bg-accent-muted text-text-primary hover:text-accent font-display text-xs uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer"
                            >
                                <Send size={14} />
                                <span>Contact Me</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Reveal>

            </div>
        </section>
    );
};

export default Contact;