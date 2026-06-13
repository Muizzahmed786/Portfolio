import React from "react";

const SkillCard = ({ title, skills }) => {
    return (
        <div className="p-6 border border-border bg-surface rounded-[4px] hover:border-accent/30 transition-colors duration-200 group h-full">
            {/* Category Title */}
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-text-primary mb-4 group-hover:text-accent transition-colors duration-200">
                // {title.toLowerCase()}
            </h3>
            
            {/* Skills Badges Grid */}
            <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                    <span 
                        key={index} 
                        className="px-3 py-1 rounded-full border border-border bg-bg text-text-secondary hover:text-accent hover:border-accent font-mono text-[11px] transition-colors duration-200 cursor-default uppercase"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillCard;