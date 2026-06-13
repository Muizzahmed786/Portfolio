import React from "react";
import { skills } from "../data/portfolio";
import SkillCard from "../components/SkillCard.jsx";
import Reveal from "../components/Reveal.jsx";

const Skills = () => {
    return (
        <section id="skills" className="text-text-primary min-h-screen max-w-275 mx-auto px-6 md:px-12 py-16 bg-bg flex flex-col justify-center">
             
             {/* Section Header */}
             <Reveal className="mb-16">
                <span className="section-eyebrow">
                    capabilities
                </span>
                <h2 className="section-heading mt-4">
                    Technical Skills
                </h2>
            </Reveal>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                    <Reveal key={skill.category} delay={index * 0.1}>
                        <SkillCard 
                            title={skill.category} 
                            skills={skill.items}
                        />
                    </Reveal>
                ))}
            </div>
            
        </section>
    );
};

export default Skills;