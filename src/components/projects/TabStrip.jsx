import React from 'react';
import FolderLayer from './FolderLayer.jsx';
import { projects } from '../../data/portfolio.js';
import SectionHeader from '../SectionHeader.jsx';
import Reveal from '../Reveal.jsx';

const TabStrip = ({ onTabClick, isLocked, activeProjectId, state = 'idle' }) => {
    return (
        <section
            id="projects"
            className="portfolio-section flex flex-col"
            aria-label="Projects archive"
        >
            <div className="content-container flex flex-col">
                
                {/* Unified Section Header */}
                <SectionHeader
                    index="04"
                    label="SELECTED WORK"
                    title="FEATURED PROJECTS"
                    subtitle="Interactive web platforms, developer intelligence tools, and data architectures. Click any dossier below to explore technical implementation."
                />

                {/* ── Developer Archive Dossier Telemetry Header ── */}
                <Reveal delay={0.1}>
                    <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] text-white/50 border-b border-white/[0.08] pb-3 mt-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-bold uppercase tracking-widest">
                                ARCHIVE // DISPATCH_READY
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline text-white/40">SYS_INDEX: 01-03</span>
                            <span className="hidden sm:inline text-white/20">//</span>
                            <span className="text-white/60 font-semibold">3 TECHNICAL DOSSIERS</span>
                        </div>
                    </div>
                </Reveal>

                {/* ── Bento Grid: Varied Card Sizes & Zero Overlap ── */}
                <div
                    className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4"
                    role="tablist"
                    aria-label="Select a project dossier"
                >
                    {projects.map((project, index) => (
                        <FolderLayer
                            key={project.id}
                            index={index}
                            project={project}
                            onClick={isLocked ? () => {} : onTabClick}
                            disabled={isLocked}
                            state={state}
                            activeProjectId={activeProjectId}
                        />
                    ))}
                </div>
            </div>

            {/* Subtle separator line */}
            <div
                className="w-full mt-16"
                style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}
                aria-hidden="true"
            />
        </section>
    );
};

export default TabStrip;
