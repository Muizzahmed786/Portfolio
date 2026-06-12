import React from "react";
import { LiaCodeBranchSolid } from "react-icons/lia";
import { skills } from "../data/portfolio";
import SkillCard from "../components/SkillCard.jsx";

const Skills = () => {
    return (
        <section id="skills" className="text-white min-h-screen scroll-mt-5 max-w-7xl mx-auto px-6 md:px-12 py-24 bg-black">
             
             {/* Section Header */}
             <div className="mb-16">
                <h2 className="text-4xl font-bold tracking-tight inline-flex items-center gap-3">
                    <LiaCodeBranchSolid className="text-yellow-400" />
                    <span>Skills</span>
                </h2>
                <div className="h-1 w-20 bg-yellow-400/50 rounded-full mt-2"></div>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <SkillCard 
                        key={skill.category} 
                        title={skill.category} 
                        skills={skill.items}
                    />
                ))}
            </div>
            
        </section>
    );
};

export default Skills;