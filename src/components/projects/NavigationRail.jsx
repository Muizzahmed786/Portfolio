import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolio.js';

const NavigationRail = ({ activeProjectId, onRailClick, state = 'detail' }) => {
    return (
        <div 
            className="flex items-center gap-4 md:gap-6 lg:gap-8 pointer-events-auto"
            aria-label="Project index"
            role="navigation"
        >
            {projects.map((project, index) => {
                const isActive = project.id === activeProjectId;
                
                // On narrow screens (mobile), "Aurora'26 Web Portal" might be too long.
                // We'll use a responsive span approach to hide "WEB PORTAL" on very small screens,
                // but keep the full title available for accessibility.
                const isLongName = project.title.toLowerCase().includes('aurora');
                const displayName = isLongName ? (
                    <>
                        <span>AURORA'26</span>
                        <span className="hidden sm:inline"> WEB PORTAL</span>
                    </>
                ) : project.title;

                return (
                    <motion.button
                        key={project.id}
                        onClick={() => !isActive && onRailClick(project.id)}
                        disabled={isActive}
                        aria-label={`Switch to ${project.title}`}
                        aria-pressed={isActive}
                        initial={false}
                        whileHover={!isActive ? {
                            y: -2, 
                            opacity: 1
                        } : {}}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={[
                            'relative focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-sm',
                            'font-bold tracking-[0.1em] uppercase whitespace-nowrap select-none transition-colors duration-200',
                            'text-[10px] md:text-[11px]',
                            isActive ? 'text-[#141414] cursor-default' : 'text-[#141414]/50 hover:text-[#141414] cursor-pointer'
                        ].join(' ')}
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        {displayName}

                        {/* Active Underline */}
                        <motion.div
                            initial={false}
                            animate={{
                                scaleX: isActive ? 1 : 0,
                                opacity: isActive ? 1 : 0
                            }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute -bottom-[4px] left-0 right-0 h-[2px] origin-left"
                            style={{ backgroundColor: project.tabColor }}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default NavigationRail;
