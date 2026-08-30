import React, { useRef } from 'react';

const FolderTab = ({ project, onClick, isActive, className = '' }) => {
    const tabRef = useRef(null);

    const handleClick = () => {
        if (tabRef.current) {
            const rect = tabRef.current.getBoundingClientRect();
            onClick(project.id, rect);
        }
    };

    return (
        <button
            ref={tabRef}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`
                relative flex items-center justify-center h-12 md:h-16 px-6 md:px-10
                cursor-pointer shrink-0 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50
                ${className}
            `}
            style={{
                backgroundColor: project.tabColor,
                // Trapezoid shape: flat top, angled sides
                clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
                // To look like a tab, we need some margins or let the flex container handle spacing
            }}
            onClick={handleClick}
        >
            <span className="font-bold text-[11px] md:text-xs tracking-[0.1em] uppercase text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>
                {project.title}
            </span>
        </button>
    );
};

export default FolderTab;
