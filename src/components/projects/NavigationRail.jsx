import React from 'react';
import { projects } from '../../data/portfolio.js';

const NavigationRail = ({ activeProjectId, onRailClick }) => {
    return (
        <div className="fixed right-0 top-0 bottom-0 w-16 md:w-20 z-50 flex flex-col items-center justify-center pointer-events-none">
            <div className="pointer-events-auto h-full w-full relative flex flex-col justify-center gap-1 py-16">
                {projects.map((project, index) => {
                    const isActive = project.id === activeProjectId;
                    
                    return (
                        <button
                            key={project.id}
                            onClick={() => !isActive && onRailClick(project.id)}
                            className={`
                                absolute right-0 w-12 md:w-16 h-32 md:h-40 flex items-center justify-center
                                cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                                focus:outline-none hover:-translate-x-2
                                ${isActive ? 'translate-x-0 z-20' : 'translate-x-6 md:translate-x-8 z-10 opacity-70 hover:opacity-100'}
                            `}
                            style={{
                                backgroundColor: project.tabColor,
                                // Center vertically based on index
                                top: `calc(50% + ${(index - projects.length / 2) * 140}px)`,
                                transformOrigin: 'right center',
                                // Flat right side, angled left side
                                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
                                borderRadius: '8px 0 0 8px' // Slightly round left corners
                            }}
                            aria-selected={isActive}
                        >
                            <span 
                                className="font-bold text-[10px] md:text-xs tracking-[0.1em] uppercase text-[#141414] whitespace-nowrap"
                                style={{ 
                                    fontFamily: 'var(--font-body)',
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)'
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
