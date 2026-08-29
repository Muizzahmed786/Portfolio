import React from 'react';

const BentoCard = ({ 
    children, 
    className = "", 
    featured = false, 
    noPadding = false,
    id 
}) => {
    // Base classes for the card
    const baseClasses = "relative bg-surface rounded-sm overflow-hidden flex flex-col";
    
    // Padding logic
    const paddingClasses = noPadding ? "" : "p-6 md:p-8";
    
    // Border and shadow logic based on featured vs normal
    const borderClasses = featured 
        ? "border-2 border-border bento-featured" 
        : "border border-border bento-hover";

    return (
        <div 
            id={id}
            className={`${baseClasses} ${paddingClasses} ${borderClasses} ${className}`}
        >
            {children}
        </div>
    );
};

export default BentoCard;
