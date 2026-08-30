import React, { useRef } from 'react';

const FolderTab = ({ project, onClick, isActive = false, disabled = false }) => {
    const tabRef = useRef(null);

    const handleClick = () => {
        if (disabled || !tabRef.current) return;
        // Measure the *visual* bounding rect of the actual tab element
        const rect = tabRef.current.getBoundingClientRect();
        onClick(project.id, rect);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        /*
         * The clip-path for the trapezoid visually cuts the button, but the
         * actual hit-target still follows the rectangular box. We wrap the
         * visual element inside a transparent rectangular hit-area so we get
         * reliable click registration while preserving the tab appearance.
         */
        <div
            ref={tabRef}
            role="tab"
            tabIndex={disabled ? -1 : 0}
            aria-selected={isActive}
            aria-disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={[
                'relative flex items-end justify-center pb-0',
                'h-14 md:h-[68px]',
                'shrink-0 select-none',
                // Transparent outer hit area — flex-1 lets tabs share space evenly
                'flex-1 min-w-[100px] max-w-[220px]',
                !disabled ? 'cursor-pointer group' : 'cursor-default',
            ].join(' ')}
        >
            {/* Actual visual tab — slightly inset horizontally so neighbours don't collide */}
            <div
                className={[
                    'relative w-[calc(100%-4px)] h-full flex items-center justify-center',
                    'transition-transform duration-200 ease-out',
                    !disabled ? 'group-hover:-translate-y-1.5' : '',
                ].join(' ')}
                style={{
                    backgroundColor: project.tabColor,
                    // Trapezoid: flat top, inward-angled sides at ~12°
                    clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0% 100%)',
                }}
            >
                <span
                    className="font-bold uppercase text-[11px] tracking-[0.1em] text-[#141414] leading-none px-4 text-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {project.title}
                </span>
            </div>

            {/* Focus ring rendered outside the clip-path so it's always visible */}
            {!disabled && (
                <span
                    className="absolute inset-0 rounded-sm pointer-events-none opacity-0 focus-visible:opacity-100 ring-2 ring-white/60"
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default FolderTab;
