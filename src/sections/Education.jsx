import React from "react";
import { GraduationCap, School, Calendar, MapPin, Activity } from "lucide-react";
import { education } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";

const Education = () => {
    // Safely grabbing the college data for the horizontal timeline
    const collegeData = education.find(edu => edu.semesters);

    return (
        <section id="education" className="text-text-primary min-h-screen scroll-mt-24 max-w-275 mx-auto px-6 md:px-12 py-32 bg-bg flex flex-col justify-center">
            
            {/* Section Header */}
            <Reveal className="mb-16">
                <span className="section-eyebrow">
                    education
                </span>
                <h2 className="section-heading mt-4">
                    Education History
                </h2>
            </Reveal>

            {/* Top Row: School & College side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {education.map((item, index) => (
                    <Reveal key={index} delay={index * 0.15}>
                        <div className="p-6 border border-border bg-surface rounded-sm hover:border-accent/30 transition-all duration-300 group flex flex-col justify-between h-full">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-border bg-bg text-text-secondary rounded-sm group-hover:text-accent group-hover:border-accent transition-colors duration-300">
                                    {item.semesters ? <GraduationCap size={20} /> : <School size={20} />}
                                </div>
                                
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-lg font-bold font-display text-text-primary tracking-tight transition-colors duration-300">
                                        {item.institution}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-snug">
                                        {item.degree}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-text-muted font-mono">
                                        <span className="flex items-center gap-1.5 text-amber-50">
                                            <Calendar size={12} className="text-text-secondary" />
                                            {item.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-amber-50">
                                            <MapPin size={12} className="text-text-secondary" />
                                            {item.location}
                                        </span>
                                    </div>

                                    {/* Score Badges */}
                                    <div className="pt-4">
                                        {item.cgpa ? (
                                            <span className="inline-flex items-center px-2.5 py-1 border border-border bg-bg text-accent font-mono text-xs rounded-sm">
                                                CGPA: {item.cgpa}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 border border-border bg-bg text-text-secondary font-mono text-xs rounded-sm">
                                                Percentage: {item.percentage}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Bottom Row: Horizontal Semester Timeline */}
            {collegeData && collegeData.semesters && (
                <Reveal delay={0.3}>
                    <div className="p-8 border border-border bg-surface rounded-sm overflow-x-auto custom-scrollbar">
                        <h3 className="text-xs font-bold font-mono uppercase tracking-wider mb-12 text-text-secondary">
                            // semester-wise performance
                        </h3>

                        {/* Horizontal Track */}
                        <div className="relative min-w-150 pt-8 pb-4">
                            {/* The Horizontal Line spanning the grid width */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>

                            {/* Flex Container Grid representing milestones */}
                            <div className="flex justify-between items-start relative">
                                {collegeData.semesters.map((sem, sIdx) => (
                                    <div key={sIdx} className="flex flex-col items-center flex-1 group relative">
                                        
                                        {/* Timeline Node Point (Positioned right on top of the line) */}
                                        <div className="absolute -top-1.25 w-2.5 h-2.5 rounded-full bg-accent border border-bg group-hover:scale-125 transition-transform duration-200 z-10"></div>
                                        
                                        {/* Semester Entry Box */}
                                        <div className="text-center space-y-1.5 p-3 border border-border bg-bg hover:border-accent transition-all duration-300 w-36 rounded-sm">
                                            <span className="block text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                                                {sem.semester}
                                            </span>
                                            <span className="inline-block font-mono text-xs text-accent font-semibold">
                                                SGPA: {sem.sgpa.toFixed(2)}
                                            </span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            )}

        </section>
    );
};

export default Education;