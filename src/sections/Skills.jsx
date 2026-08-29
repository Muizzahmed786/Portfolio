import React from "react";
import { skills, techUrls } from "../data/portfolio";
import Reveal from "../components/Reveal.jsx";
import BentoGrid from '../components/BentoGrid.jsx';
import BentoCard from '../components/BentoCard.jsx';

import { 
    SiPython, SiOpenjdk, SiC, SiCplusplus, SiMysql, SiJavascript,
    SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
    SiGit, SiVercel, SiRender, SiPostman, SiOpencv,
    SiPandas, SiNumpy
} from "react-icons/si";

import { FaHtml5, FaCss3Alt, FaChartLine } from "react-icons/fa";

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
    const allSkills = skills.filter(category => category.category !== "Coursework").flatMap(category => category.items);
    
    // Group into rows for Pascal's Triangle layout
    let currentIndex = 0;
    let rowSize = 1;
    const rows = [];
    while (currentIndex < allSkills.length) {
        rows.push(allSkills.slice(currentIndex, currentIndex + rowSize));
        currentIndex += rowSize;
        rowSize++;
    }

    return (
        <section id="skills" className="relative z-0 scroll-mt-5 bg-transparent overflow-hidden py-16">
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12">
             
             <Reveal delay={0.15}>
                 <BentoGrid>
                    {/* Skills Triangle Bento Block */}
                    <BentoCard className="col-span-1 md:col-span-12 lg:col-span-12 flex flex-col justify-center" noPadding={true}>
                        
                        <div className="flex flex-col xl:flex-row">
                            {/* Label Area */}
                            <div className="p-6 md:p-8 xl:border-r border-border border-b xl:border-b-0 min-w-[200px] flex flex-col justify-center z-10 bg-surface">
                                <span className="section-eyebrow mb-2">
                                    capabilities
                                </span>
                                <h2 className="editorial-heading text-3xl md:text-4xl text-text-primary">
                                    STACK
                                </h2>
                            </div>

                            {/* Triangle Area */}
                            <div className="relative flex-1 flex justify-center py-10 md:py-16 bg-surface/30">
                                <div className="flex flex-col items-center gap-2 md:gap-3 w-full px-2 md:px-4">
                                    {rows.map((row, rIdx) => (
                                        <div key={rIdx} className="flex flex-row flex-nowrap justify-center gap-1.5 md:gap-2.5 w-full">
                                            {row.map((skill, sIdx) => {
                                                const skillData = iconMap[skill];
                                                const brandColor = skillData?.color || "var(--color-accent)";
                                                const url = techUrls[skill] || "#";
                                                
                                                const ItemWrapper = url !== "#" ? 'a' : 'div';
                                                
                                                return (
                                                    <ItemWrapper 
                                                        key={`${skill}-${sIdx}`}
                                                        href={url !== "#" ? url : undefined}
                                                        target={url !== "#" ? "_blank" : undefined}
                                                        rel={url !== "#" ? "noopener noreferrer" : undefined}
                                                        className="inline-flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-sm border bg-surface text-text-primary transition-all duration-200 cursor-pointer uppercase shadow-sm hover:scale-105 group whitespace-nowrap"
                                                        style={{ borderColor: `${brandColor}30` }}
                                                    >
                                                        {skillData && (
                                                            <span 
                                                                className="text-sm md:text-base transition-transform duration-200 group-hover:scale-110"
                                                                style={{ color: brandColor }}
                                                            >
                                                                {skillData.icon}
                                                            </span>
                                                        )}
                                                        <span className="font-mono text-[9px] md:text-[10px] tracking-wide text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                                                            {skill}
                                                        </span>
                                                    </ItemWrapper>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </BentoCard>
                 </BentoGrid>
            </Reveal>
            
            </div>
        </section>
    );
};

export default Skills;