import React from "react";

const SkillCard = ({ title, skills }) => {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] transition-all duration-300 group">
            {/* Category Title */}
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                {title}
            </h3>
            
            {/* Skills Badges Grid */}
            <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                    <span 
                        key={index} 
                        className="px-3.5 py-1.5 rounded-xl bg-white/3 hover:bg-yellow-400/10 text-gray-300 hover:text-yellow-400 text-sm font-medium border border-white/5 hover:border-yellow-400/20 transition-all duration-200 cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillCard;