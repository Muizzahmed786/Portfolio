import React from 'react';
import { projects } from '../../data/portfolio.js';

const RAIL_TAB_HEIGHT = 120; // px — h-[120px]
const RAIL_TAB_GAP    = 8;   // px gap between tabs

const NavigationRail = ({ activeProjectId, onRailClick, state = 'detail' }) => {
    const total = projects.length;
    const stackHeight = total * RAIL_TAB_HEIGHT + (total - 1) * RAIL_TAB_GAP;

    const isVisible = state === 'detail';

    return (
        <div
            className="fixed right-0 top-0 bottom-0 z-[65] flex flex-col items-end justify-center pointer-events-none"
            style={{ width: '64px' }}
            aria-label="Project navigation"
            role="navigation"
        >
            <div
                className="relative pointer-events-auto"
                style={{ height: stackHeight, width: '64px' }}
            >
                {projects.map((project, index) => {
                    const isActive = project.id === activeProjectId;
                    const top = index * (RAIL_TAB_HEIGHT + RAIL_TAB_GAP);

                    return (
                        <button
                            key={project.id}
                            onClick={() => !isActive && onRailClick(project.id)}
                            disabled={isActive || !isVisible}
                            aria-label={`Switch to ${project.title}`}
                            aria-pressed={isActive}
                            className={[
                                'absolute right-0 flex items-center justify-center',
                                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                                'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                                !isVisible
                                    ? 'translate-x-full opacity-0'
                                    : isActive
                                        ? 'translate-x-0 z-20 cursor-default'
                                        : 'translate-x-10 z-10 opacity-55 hover:opacity-85 hover:translate-x-6 cursor-pointer',
                            ].join(' ')}
                            style={{
                                top,
                                width: '64px',
                                height: `${RAIL_TAB_HEIGHT}px`,
                                backgroundColor: project.tabColor,
                                // Angled left side, flat right side — visible tab peek
                                clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                borderRadius: '6px 0 0 6px',
                                transformOrigin: 'right center',
                            }}
                        >
                            <span
                                className="font-bold text-[10px] tracking-[0.1em] uppercase text-[#141414] whitespace-nowrap select-none"
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                    // Shift text left slightly to account for the clipped left-angled edge
                                    marginLeft: '-6px',
                                }}
                            >
                                {project.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default NavigationRail;
