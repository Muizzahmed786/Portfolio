import React, { useState, useEffect } from 'react';
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { techUrls } from "../../data/portfolio.js";

const ArchiveSurface = ({ project }) => {
    // Handle local animation state when project changes
    const [displayProject, setDisplayProject] = useState(project);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (project.id !== displayProject.id) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setDisplayProject(project);
                setIsAnimating(false);
            }, 250); // match transition duration
            return () => clearTimeout(timer);
        }
    }, [project, displayProject.id]);

    return (
        <div className="relative w-full bg-[#191815] border border-[#2B2923] rounded-b-md rounded-tr-md z-10">
            {/* Minimal Depth Backing Layer */}
            <div className="absolute top-[2px] left-[2px] right-[-4px] bottom-[-4px] border border-[#2B2923] rounded-b-md rounded-tr-md -z-10 pointer-events-none opacity-50 bg-[#11100E]"></div>

            {/* Content Container with Animation */}
            <div 
                className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
                {/* Meta Header */}
                <div className="p-8 md:p-12 border-b border-[#201E19]">
                    <div className="font-mono text-xs text-text-secondary tracking-widest space-y-2">
                        <p><span className="text-accent font-bold">ID   // </span> {displayProject.id.toUpperCase()}</p>
                        <p><span className="text-accent font-bold">TYPE // </span> {displayProject.type}</p>
                        <p><span className="text-accent font-bold">YEAR // </span> {displayProject.year}</p>
                        {displayProject.status && (
                            <p><span className="text-accent font-bold">STAT // </span> {displayProject.status.toUpperCase()}</p>
                        )}
                    </div>
                </div>

                {/* Main Body */}
                <div className="p-8 md:p-12 space-y-12">
                    
                    {/* Big Title & Description */}
                    <div className="space-y-6 max-w-4xl">
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
                            {displayProject.title.toUpperCase()}
                        </h1>
                        <p className="font-body text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                            {displayProject.description}
                        </p>
                    </div>
                    
                    {/* Two Column Layout for details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Highlights & Screenshot */}
                        <div className="lg:col-span-8 space-y-12">
                            {displayProject.highlights && displayProject.highlights.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="font-mono text-xs text-text-secondary tracking-widest border-b border-[#201E19] pb-3">KEY_FEATURES</h3>
                                    <ul className="space-y-4">
                                        {displayProject.highlights.map((highlight, idx) => (
                                            <li key={idx} className="font-body text-text-secondary font-light flex items-start gap-4">
                                                <span className="text-accent font-bold select-none mt-1 text-[10px]">■</span>
                                                <span className="leading-relaxed">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {displayProject.image && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 border-b border-[#201E19] pb-3">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                        <span className="font-mono text-[10px] text-text-secondary tracking-widest">FIG 01. INTERFACE_CAPTURE</span>
                                    </div>
                                    <div className="p-2 border border-[#2B2923] bg-[#11100E] rounded-sm relative">
                                        {/* Physical Tape effect */}
                                        <div className="absolute top-[-4px] right-8 w-12 h-3 bg-white/5 rotate-2 pointer-events-none"></div>
                                        <div className="absolute bottom-[-4px] left-8 w-12 h-3 bg-white/5 -rotate-2 pointer-events-none"></div>
                                        
                                        <img src={displayProject.image} alt={displayProject.title} className="w-full h-auto rounded-[2px]" loading="lazy" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stack & Links Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            
                            <div className="space-y-6">
                                <h3 className="font-mono text-xs text-text-secondary tracking-widest border-b border-[#201E19] pb-3">TECH_STACK</h3>
                                <div className="flex flex-wrap gap-2">
                                    {displayProject.stack.map((tech, idx) => {
                                        const url = techUrls[tech] || "#";
                                        const Wrapper = url !== "#" ? 'a' : 'span';
                                        return (
                                            <Wrapper 
                                                key={idx}
                                                href={url !== "#" ? url : undefined}
                                                target={url !== "#" ? "_blank" : undefined}
                                                className={`px-3 py-1.5 border border-[#2B2923] bg-[#11100E] rounded-sm font-mono text-[10px] text-text-primary transition-colors ${url !== "#" ? 'hover:border-accent hover:text-accent' : ''}`}
                                            >
                                                {tech.toUpperCase()}
                                            </Wrapper>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-mono text-xs text-text-secondary tracking-widest border-b border-[#201E19] pb-3">PROJECT_LINKS</h3>
                                <div className="flex flex-col gap-4">
                                    {displayProject.github && (
                                        <a href={displayProject.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-sm text-accent hover:text-text-primary transition-colors flex items-center gap-3">
                                            <FaGithub size={16} /> SOURCE CODE ↗
                                        </a>
                                    )}
                                    {displayProject.link && (
                                        <a href={displayProject.link} target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-sm text-accent hover:text-text-primary transition-colors flex items-center gap-3">
                                            <ExternalLink size={16} /> LIVE DEMO ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ArchiveSurface;
