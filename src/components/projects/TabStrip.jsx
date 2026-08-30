import React from 'react';
import FolderTab from './FolderTab.jsx';
import { projects } from '../../data/portfolio.js';
import Reveal from '../Reveal.jsx';

const TabStrip = ({ onTabClick, isLocked }) => {
    return (
        <section
            id="projects"
            className="relative z-0 min-h-screen flex flex-col"
            style={{ backgroundColor: '#181818' }}
            aria-label="Projects archive"
        >
            {/* Hero content area */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col flex-1 pt-28 md:pt-32">

                {/* Eyebrow */}
                <Reveal>
                    <p
                        className="font-bold uppercase tracking-[0.18em] text-[11px] mb-5"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(242,242,238,0.45)' }}
                    >
                        // Selected Work
                    </p>

                    {/* Archive heading */}
                    <h2
                        className="text-[#F2F2EE] leading-[0.9] mb-10 md:mb-16"
                        style={{
                            fontFamily: 'var(--font-fraunces)',
                            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Projects
                    </h2>

                    <p
                        className="max-w-xl text-lg md:text-xl leading-[1.65] mb-16 md:mb-24"
                        style={{ fontFamily: 'var(--font-source-serif)', color: 'rgba(242,242,238,0.6)' }}
                    >
                        A collection of recent work spanning web applications, developer tools, and interactive experiences. Click any tab to explore.
                    </p>
                </Reveal>

                {/* Spacer that pushes tabs to the bottom */}
                <div className="flex-1" />

                {/* ─── Tab strip ─── */}
                {/*
                 * Tabs sit flush with the bottom of the section.
                 * overflow-x-auto on mobile only; on desktop tabs have max-width and share space.
                 * The strip has no visible base line — the tabs themselves create the visual edge.
                 */}
                <div
                    className="w-full flex flex-nowrap md:flex-wrap items-end overflow-x-auto no-scrollbar gap-1.5 pb-0"
                    role="tablist"
                    aria-label="Select a project"
                >
                    {projects.map((project) => (
                        <FolderTab
                            key={project.id}
                            project={project}
                            onClick={isLocked ? () => {} : onTabClick}
                            disabled={isLocked}
                        />
                    ))}
                </div>
            </div>

            {/* Thin separator line at the very bottom */}
            <div
                className="w-full"
                style={{ height: '1px', backgroundColor: 'rgba(242,242,238,0.08)' }}
                aria-hidden="true"
            />
        </section>
    );
};

export default TabStrip;
