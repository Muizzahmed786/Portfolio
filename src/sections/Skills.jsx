import React from "react";
import { skills } from "../data/portfolio";
import Reveal from "../components/Reveal.jsx";
import SoftAurora from "../animations/SoftAurora.jsx";

import { 
    SiPython, SiOpenjdk, SiC, SiCplusplus, SiMysql, SiJavascript,
    SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
    SiGit, SiVercel, SiRender, SiPostman, SiOpencv,
    SiPandas, SiNumpy
} from "react-icons/si";

import { FaHtml5, FaCss3Alt, FaChartLine } from "react-icons/fa";

// Map each skill to its icon component AND its official brand HEX color
const iconMap = {
    "Python": { icon: <SiPython />, color: "#3776AB" },
    "Java": { icon: <SiOpenjdk />, color: "#007396" },
    "C": { icon: <SiC />, color: "#A8B9CC" },
    "C++": { icon: <SiCplusplus />, color: "#00599C" },
    "SQL": { icon: <SiMysql />, color: "#4479A1" },
    "JavaScript": { icon: <SiJavascript />, color: "#F7DF1E" },
    "React.js": { icon: <SiReact />, color: "#61DAFB" },
    "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
    "Express.js": { icon: <SiExpress />, color: "#FFFFFF" }, 
    "MongoDB": { icon: <SiMongodb />, color: "#47A248" },
    "HTML": { icon: <FaHtml5 />, color: "#E34F26" },
    "CSS": { icon: <FaCss3Alt />, color: "#1572B6" },
    "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
    "Git": { icon: <SiGit />, color: "#F05032" },
    "Vercel": { icon: <SiVercel />, color: "#FFFFFF" }, 
    "Render": { icon: <SiRender />, color: "#46E3B7" },
    "Postman": { icon: <SiPostman />, color: "#FF6C37" },
    "OpenCV": { icon: <SiOpencv />, color: "#5C3EE8" },
    "Pandas": { icon: <SiPandas />, color: "#150458" },
    "NumPy": { icon: <SiNumpy />, color: "#013243" },
    "Matplotlib": { icon: <FaChartLine />, color: "#11557C" } 
};

const Skills = () => {
    // Filter out Coursework from the array
    const allSkills = skills.filter(category => category.category !== "Coursework").flatMap(category => category.items);

    const tripleSkills = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section id="skills" className="relative min-h-screen z-0 scroll-mt-5 bg-bg overflow-hidden flex items-center">
            {/* Background Animation Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                <SoftAurora
                    speed={0.3}
                    scale={1.2}
                    brightness={0.7}
                    color1="#f5c518"
                    color2="#ff8c00"
                    enableMouseInteraction={true}
                    mouseInfluence={0.15}
                />
            </div>

            <div className="relative z-10 text-text-primary w-full max-w-275 mx-auto px-6 md:px-12 py-16 flex flex-col justify-center">
             
             {/* Section Header */}
             <Reveal className="mb-16">
                <span className="section-eyebrow">
                    capabilities
                </span>
                <h2 className="section-heading mt-4">
                    Technical Skills
                </h2>
            </Reveal>

            {/* Carousel */}
            <div className="relative w-full flex overflow-x-hidden border-y border-border py-12 bg-surface/30 mask-gradient">
                <div className="flex space-x-8 whitespace-nowrap animate-marquee">
                    {tripleSkills.map((skill, index) => {
                        const skillData = iconMap[skill];
                        const brandColor = skillData?.color || "var(--color-accent)";
                        
                        return (
                            <div 
                                key={`${skill}-${index}`}
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-md border bg-surface text-text-primary transition-all duration-200 cursor-default uppercase shadow-sm hover:-translate-y-0.5 group"
                                // Directly assigning permanent styles via inline style attributes
                                style={{ 
                                    borderColor: `${brandColor}20`, // Appends "20" for 12% opacity subtle borders
                                }}
                            >
                                {skillData && (
                                    <span 
                                        className="text-xl transition-transform duration-200 group-hover:scale-110"
                                        style={{ color: brandColor }} // Permanent brand coloring
                                    >
                                        {skillData.icon}
                                    </span>
                                )}
                                <span className="font-mono text-sm tracking-wide text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                                    {skill}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            </div>
        </section>
    );
};

export default Skills;