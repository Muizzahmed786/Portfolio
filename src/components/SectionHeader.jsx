import React from 'react';
import Reveal from './Reveal.jsx';

/**
 * SectionHeader
 * Cohesive, technical section header used across all portfolio sections.
 * Features consistent numbering, category indicator, and typography hierarchy.
 */
const SectionHeader = ({ index, label, title, subtitle, className = "" }) => {
    return (
        <Reveal className={`mb-10 md:mb-12 ${className}`}>
            <div className="flex items-center gap-2.5 mb-2.5">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                    // {index}
                </span>
                <span className="w-5 h-[1px] bg-accent/40" />
                <span className="font-mono text-xs text-text-secondary tracking-[0.16em] uppercase">
                    {label}
                </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary uppercase leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm md:text-base text-text-secondary mt-2.5 max-w-xl font-light leading-relaxed">
                    {subtitle}
                </p>
            )}
        </Reveal>
    );
};

export default SectionHeader;
