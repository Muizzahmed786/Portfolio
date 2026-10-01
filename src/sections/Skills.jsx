import React from "react";
import { skills, techUrls } from "../data/portfolio";
import Reveal from "../components/Reveal.jsx";
import BentoCard from '../components/BentoCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { Cpu, Layers, Wrench, BarChart2, BookOpen, ExternalLink } from "lucide-react";

import { 
    SiPython, SiOpenjdk, SiC, SiCplusplus, SiMysql, SiJavascript,
    SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
    SiGit, SiVercel, SiRender, SiPostman, SiOpencv,
    SiPandas, SiNumpy
} from "react-icons/si";

import { FaHtml5, FaCss3Alt, FaChartLine } from "react-icons/fa";

const iconMap = {
    "Python": { icon: <SiPython />, color: "#3776AB" },
    "Java": { icon: <SiOpenjdk />, color: "#E76F00" },
    "C": { icon: <SiC />, color: "#659AD2" },
    "C++": { icon: <SiCplusplus />, color: "#00599C" },
    "SQL": { icon: <SiMysql />, color: "#00758F" },
    "JavaScript": { icon: <SiJavascript />, color: "#F7DF1E" },
    "React.js": { icon: <SiReact />, color: "#61DAFB" },
    "Node.js": { icon: <SiNodedotjs />, color: "#5FA04E" },
    "Express.js": { icon: <SiExpress />, color: "#F2F0E8" }, 
    "MongoDB": { icon: <SiMongodb />, color: "#47A248" },
    "HTML": { icon: <FaHtml5 />, color: "#E34F26" },
    "CSS": { icon: <FaCss3Alt />, color: "#1572B6" },
    "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
    "Git": { icon: <SiGit />, color: "#F05032" },
    "Vercel": { icon: <SiVercel />, color: "#F2F0E8" }, 
    "Render": { icon: <SiRender />, color: "#46E3B7" },
    "Postman": { icon: <SiPostman />, color: "#FF6C37" },
    "OpenCV": { icon: <SiOpencv />, color: "#5C3EE8" },
    "Pandas": { icon: <SiPandas />, color: "#150458" },
    "NumPy": { icon: <SiNumpy />, color: "#4DABCF" },
    "Matplotlib": { icon: <FaChartLine />, color: "#11557C" } 
};

const categoryIcons = {
    "Languages": <Cpu size={16} className="text-accent" />,
    "Web Development": <Layers size={16} className="text-accent" />,
    "Tools & Platforms": <Wrench size={16} className="text-accent" />,
    "Libraries": <BarChart2 size={16} className="text-accent" />,
    "Coursework": <BookOpen size={16} className="text-accent" />,
};

// Map each category to an intentional 12-column grid span
// Row 1: Languages (4) + Web Dev (4) + Tools (4) = 12
// Row 2: Libraries (4) + Coursework (8) = 12
const getCategoryGridSpan = (category) => {
    switch (category) {
        case "Languages":
            return "col-span-12 md:col-span-6 lg:col-span-4";
        case "Web Development":
            return "col-span-12 md:col-span-6 lg:col-span-4";
        case "Tools & Platforms":
            return "col-span-12 md:col-span-12 lg:col-span-4";
        case "Libraries":
            return "col-span-12 md:col-span-5 lg:col-span-4";
        case "Coursework":
            return "col-span-12 md:col-span-7 lg:col-span-8";
        default:
            return "col-span-12 md:col-span-6 lg:col-span-4";
    }
};

const Skills = () => {
    return (
        <section id="skills" className="portfolio-section">
            <div className="content-container">
             
                <SectionHeader
                    index="03"
                    label="CAPABILITIES"
                    title="TECHNICAL ARSENAL"
                    subtitle="Languages, frameworks, developer tools, and theoretical principles powering my engineering workflow."
                />

                <Reveal delay={0.15}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        {skills.map((categoryGroup, idx) => {
                            const isCoursework = categoryGroup.category === "Coursework";
                            const gridSpan = getCategoryGridSpan(categoryGroup.category);

                            return (
                                <div key={categoryGroup.category} className={`${gridSpan} flex`}>
                                    <BentoCard
                                        className="w-full p-6 md:p-8 flex flex-col justify-between"
                                        featured={idx === 1} // Spotlight Web Development
                                    >
                                        <div>
                                            {/* Category Header */}
                                            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="p-2 rounded-md bg-accent/[0.08] border border-accent/20">
                                                        {categoryIcons[categoryGroup.category] || <Cpu size={16} className="text-accent" />}
                                                    </div>
                                                    <h3 className="font-display text-base font-bold text-text-primary tracking-wide">
                                                        {categoryGroup.category}
                                                    </h3>
                                                </div>
                                                <span className="font-mono text-[10px] text-text-muted">
                                                    {categoryGroup.items.length} {isCoursework ? "domains" : "tools"}
                                                </span>
                                            </div>

                                            {/* Skills Badges Grid */}
                                            <div className="flex flex-wrap gap-2.5">
                                                {categoryGroup.items.map((skill) => {
                                                    const skillData = iconMap[skill];
                                                    const brandColor = skillData?.color || "var(--color-accent)";
                                                    const url = techUrls[skill];
                                                    const isLink = Boolean(url);
                                                    const ItemTag = isLink ? "a" : "div";

                                                    return (
                                                        <ItemTag
                                                            key={skill}
                                                            href={isLink ? url : undefined}
                                                            target={isLink ? "_blank" : undefined}
                                                            rel={isLink ? "noopener noreferrer" : undefined}
                                                            className={`group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-accent/40 transition-all duration-200 ${
                                                                isLink ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default"
                                                            }`}
                                                            style={{
                                                                boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                                                            }}
                                                        >
                                                            {skillData && (
                                                                <span
                                                                    className="text-base transition-transform duration-200 group-hover:scale-115 shrink-0"
                                                                    style={{ color: brandColor }}
                                                                >
                                                                    {skillData.icon}
                                                                </span>
                                                            )}
                                                            <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                                                                {skill}
                                                            </span>
                                                            {isLink && (
                                                                <ExternalLink size={10} className="text-text-muted group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 -ml-0.5" />
                                                            )}
                                                        </ItemTag>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Bottom Status Indicator */}
                                        <div className="pt-5 mt-5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-text-muted">
                                            <span className="uppercase">STATUS: VERIFIED</span>
                                            <span className="text-accent/60">// ACTIVE</span>
                                        </div>
                                    </BentoCard>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
                
            </div>
        </section>
    );
};

export default Skills;