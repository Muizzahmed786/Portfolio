import React from 'react';
import FolderTab from './FolderTab.jsx';
import { projects } from '../../data/portfolio.js';

const TabStrip = ({ onTabClick, isLocked, activeProjectId, state = 'idle' }) => {
    return (
        <section
            id="projects"
            className="relative z-0 scroll-mt-16 flex flex-col"
            style={{
                backgroundColor: '#181818',
                // Deliberately NOT min-h-screen — let content size it naturally
                paddingTop: '6rem',     // clears the fixed navbar (64px) + breathing room
                paddingBottom: 0,
            }}
            aria-label="Projects archive"
        >
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col">

                {/* Eyebrow — no Reveal wrapper, render immediately */}
                <p
                    className="font-bold uppercase tracking-[0.18em] text-[11px] mb-4"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(242,242,238,0.45)' }}
                >
                    // Selected Work
                </p>

                {/* Archive heading */}
                <h2
                    className="text-[#F2F2EE] leading-[0.9] mb-8"
                    style={{
                        fontFamily: 'var(--font-fraunces)',
                        fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                    }}
                >
                    Projects
                </h2>

                <p
                    className="max-w-lg text-base md:text-lg leading-[1.65] mb-10 md:mb-12"
                    style={{ fontFamily: 'var(--font-source-serif)', color: 'rgba(242,242,238,0.55)' }}
                >
                    A collection of recent work spanning web applications, developer tools, and interactive experiences. Click any tab to explore.
                </p>

                {/* ─── Tab strip ─── */}
                <div
                    className="w-full flex flex-nowrap md:flex-wrap items-end overflow-x-auto no-scrollbar gap-1.5"
                    role="tablist"
                    aria-label="Select a project"
                >
                    {projects.map((project) => (
                        <FolderTab
                            key={project.id}
                            project={project}
                            onClick={isLocked ? () => {} : onTabClick}
                            disabled={isLocked}
                            state={state}
                            activeProjectId={activeProjectId}
                        />
                    ))}
                </div>
            </div>

            {/* Thin separator line at the very bottom, flush with tabs */}
            <div
                className="w-full mt-0"
                style={{ height: '1px', backgroundColor: 'rgba(242,242,238,0.08)' }}
                aria-hidden="true"
            />
        </section>
    );
};

export default TabStrip;
