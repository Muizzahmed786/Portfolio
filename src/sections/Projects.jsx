import React from "react";
import { Folder, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";

const Projects = () => {
    return (
        <section id="projects" className="text-text-primary min-h-screen scroll-mt-24 max-w-[1100px] mx-auto px-6 md:px-12 py-32 bg-bg flex flex-col justify-center">
            
            {/* Section Header */}
            <Reveal className="mb-16">
                <span className="section-eyebrow">
                    projects
                </span>
                <h2 className="section-heading mt-4">
                    Featured Projects
                </h2>
            </Reveal>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <Reveal key={index} delay={index * 0.15} className="h-full">
                        <div className="p-8 border border-border bg-surface rounded-[4px] project-card group flex flex-col justify-between h-full">
                            <div className="space-y-6">
                                {/* Card Top / Header */}
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-[10px] tracking-wider text-accent uppercase">
                                        // project #{String(index + 1).padStart(2, "0")}
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
                                                <FaGithub size={16} />
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
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-display text-text-primary tracking-tight transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed font-light font-body">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Highlights List */}
                                {project.highlights && project.highlights.length > 0 && (
                                    <ul className="space-y-2 pt-4 border-t border-border">
                                        {project.highlights.map((highlight, hIdx) => (
                                            <li key={hIdx} className="text-xs text-text-secondary flex items-start gap-2 font-mono">
                                                <span className="text-accent font-bold select-none">•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Tech Stack Badges */}
                            <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-border">
                                {project.stack.map((tech, tIdx) => (
                                    <span 
                                        key={tIdx} 
                                        className="px-2.5 py-0.5 rounded-full border border-border bg-bg text-text-secondary hover:text-accent hover:border-accent font-mono text-[9px] transition-colors duration-200 cursor-default uppercase"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

        </section>
    );
};

export default Projects;
