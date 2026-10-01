import React, { useRef } from 'react';

const BentoCard = ({ 
    children, 
    className = "", 
    featured = false, 
    noPadding = false,
    interactive = false,
    id 
}) => {
    const cardRef = useRef(null);

    const dispatchInteraction = (type) => {
        if (!interactive || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent(type, { detail: { rect } }));
    };

    const handlePointerEnter = () => dispatchInteraction('bento-hover');
    const handlePointerLeave = () => dispatchInteraction('bento-leave');
    const handlePointerDown = () => dispatchInteraction('bento-click');

    // Base classes for the card
    const baseClasses = "relative rounded-xl overflow-hidden flex flex-col transition-all duration-300";
    
    // Padding logic
    const paddingClasses = noPadding ? "" : "p-6 md:p-8";
    
    // Border and shadow logic based on featured vs normal
    const borderClasses = featured 
        ? "bento-featured" 
        : "bento-hover";

    return (
        <div 
            id={id}
            ref={cardRef}
            className={`${baseClasses} ${paddingClasses} ${borderClasses} ${className}`}
            onPointerEnter={interactive ? handlePointerEnter : undefined}
            onPointerLeave={interactive ? handlePointerLeave : undefined}
            onPointerDown={interactive ? handlePointerDown : undefined}
        >
            {children}
        </div>
    );
};

export default BentoCard;

