import React from 'react';

const BentoGrid = ({ children, className = "" }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 ${className}`}>
            {children}
        </div>
    );
};

export default BentoGrid;
