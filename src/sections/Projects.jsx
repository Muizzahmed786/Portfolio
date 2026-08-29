import React from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, techUrls } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import BentoGrid from '../components/BentoGrid.jsx';
import BentoCard from '../components/BentoCard.jsx';

const Projects = () => {
    return (
        <section id="projects" className="relative z-0 scroll-mt-5 bg-transparent overflow-hidden py-16">
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12">
            
            {/* Section Header */}
            <Reveal className="mb-10">
                <span className="section-eyebrow">
                    projects
                </span>
                <h2 className="editorial-heading text-4xl md:text-5xl mt-2 text-text-primary">
                    SELECTED WORK
                </h2>
            </Reveal>

            {/* Projects Grid */}
            <Reveal delay={0.15}>
                <BentoGrid>
                    {projects.map((project, index) => {
                        // Smart layout logic
                        let isFeatured = false;
                        let spanClasses = "col-span-1 md:col-span-6 lg:col-span-4";

                        if (index === 0) {
                            isFeatured = true;
                            spanClasses = "col-span-1 md:col-span-12 lg:col-span-8";
                        } else if (index === 1) {
                            isFeatured = false;
                            spanClasses = "col-span-1 md:col-span-6 lg:col-span-4";
                        } else if (index === 2) {
                            isFeatured = true;
                            // If it's the last item in a 3-item array, span full width!
                            spanClasses = "col-span-1 md:col-span-12 lg:col-span-12";
                        } else if (index === 3) {
                            isFeatured = true;
                            spanClasses = "col-span-1 md:col-span-12 lg:col-span-8";
                        }

                        return (
                            <BentoCard key={index} className={spanClasses} featured={isFeatured}>
                                <div className="space-y-6 flex flex-col h-full justify-between">
                                    <div className="space-y-6">
                                        {/* Card Top / Header */}
                                        <div className="flex justify-between items-center border-b border-border pb-4">
                                            <span className="font-mono text-xs tracking-wider text-accent uppercase font-bold">
                                                // PROJECT #{String(index + 1).padStart(2, "0")}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                {project.github && (
                                                    <a 
                                                        href={project.github} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-text-secondary hover:text-accent transition-colors duration-200"
                                                        aria-label="GitHub Repository"
                                                    >
                                                        <FaGithub size={18} />
                                                    </a>
                                                )}
                                                {project.link && (
                                                    <a 
                                                        href={project.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-text-secondary hover:text-accent transition-colors duration-200"
                                                        aria-label="Project Link"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <div className="space-y-3">
                                            <h3 className={`${isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold font-display text-text-primary tracking-tight`}>
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-text-secondary leading-relaxed font-light font-body">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Highlights List (Only show for featured or if there's enough room) */}
                                        {isFeatured && project.highlights && project.highlights.length > 0 && (
                                            <ul className="space-y-2 pt-4">
                                                {project.highlights.map((highlight, hIdx) => (
                                                    <li key={hIdx} className="text-sm text-text-secondary flex items-start gap-3 font-body font-light">
                                                        <span className="text-accent font-bold select-none mt-0.5">•</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border">
                                        {project.stack.map((tech, tIdx) => {
                                            const url = techUrls[tech] || "#";
                                            const Wrapper = url !== "#" ? 'a' : 'span';
                                            
                                            return (
                                                <Wrapper 
                                                    key={tIdx} 
                                                    href={url !== "#" ? url : undefined}
                                                    target={url !== "#" ? "_blank" : undefined}
                                                    rel={url !== "#" ? "noopener noreferrer" : undefined}
                                                    className={`px-2.5 py-1 rounded-sm border border-border bg-bg text-text-secondary hover:text-accent font-mono text-[10px] transition-colors duration-200 uppercase ${url !== "#" ? "cursor-pointer" : "cursor-default"}`}
                                                >
                                                    {tech}
                                                </Wrapper>
                                            );
                                        })}
                                    </div>
                                </div>
                            </BentoCard>
                        );
                    })}
                </BentoGrid>
            </Reveal>

            </div>
        </section>
    );
};

export default Projects;
