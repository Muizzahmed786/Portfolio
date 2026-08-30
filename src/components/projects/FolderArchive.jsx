import React, { useState } from 'react';
import { projects } from '../../data/portfolio.js';
import ProjectTab from './ProjectTab.jsx';
import ArchiveSurface from './ArchiveSurface.jsx';
import Reveal from '../Reveal.jsx';

const FolderArchive = () => {
    // Keep first project active by default
    const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

    const activeProject = projects.find(p => p.id === activeProjectId);

    return (
        <section id="projects" className="relative z-0 scroll-mt-5 bg-transparent py-16 min-h-screen flex flex-col">
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col">
                
                {/* Archive Header */}
                <Reveal className="mb-12">
                    <span className="section-eyebrow">
                        // PROJECT ARCHIVE
                    </span>
                    <h2 className="editorial-heading text-text-primary text-4xl md:text-5xl mt-2">
                        SELECTED WORK
                    </h2>
                </Reveal>

                {/* The Interactive Archive */}
                <div className="relative w-full flex flex-col">
                    
                    {/* Tabs Row */}
                    {/* Mobile: horizontal scroll. Desktop: wrap or inline block */}
                    <div className="flex flex-nowrap md:flex-wrap items-end overflow-x-auto md:overflow-visible no-scrollbar pb-[1px] -mb-[1px]">
                        {projects.map((project, index) => (
                            <ProjectTab 
                                key={project.id}
                                project={project}
                                index={index}
                                isActive={activeProjectId === project.id}
                                onClick={() => setActiveProjectId(project.id)}
                            />
                        ))}
                    </div>

                    {/* Archive Surface */}
                    {activeProject && (
                        <ArchiveSurface project={activeProject} />
                    )}

                </div>

            </div>
        </section>
    );
};

export default FolderArchive;
