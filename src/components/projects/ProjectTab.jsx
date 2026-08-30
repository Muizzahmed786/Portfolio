import React from 'react';

const ProjectTab = ({ project, index, isActive, onClick }) => {
    const num = String(index + 1).padStart(2, "0");

    const handleMouseEnter = () => {
        window.dispatchEvent(new CustomEvent('bento-hover'));
    };

    const handleClick = () => {
        onClick();
        window.dispatchEvent(new CustomEvent('bento-click'));
    }

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`
                relative flex items-center px-4 md:px-6 h-10 md:h-12 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                border border-b-0 rounded-t-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent
                group cursor-pointer shrink-0
                ${isActive 
                    ? 'bg-[#191815] border-accent z-20' 
                    : 'bg-[#11100E] border-[#2B2923] hover:border-accent/70 z-10 hover:-translate-y-0.5 opacity-80 hover:opacity-100'}
            `}
            style={{
                // ensure the bottom of the active tab connects seamlessly to the archive surface
                transform: isActive ? 'translateY(1px)' : 'none'
            }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
        >
            <span className={`font-mono text-[10px] md:text-xs mr-3 transition-colors ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {num}
            </span>
            <span className={`font-display font-bold text-xs md:text-sm tracking-wide transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {project.title.toUpperCase()}
            </span>
            
            {/* Seamless seam cover for the active tab */}
            {isActive && (
                <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#191815]"></div>
            )}
        </button>
    );
};

export default ProjectTab;
