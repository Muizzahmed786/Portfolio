import React from "react";
import { GraduationCap, School, Calendar, MapPin, Award } from "lucide-react";
import { education } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import BentoCard from '../components/BentoCard.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const Education = () => {
    const collegeData = education.find(edu => edu.semesters);
    const schoolData = education.find(edu => !edu.semesters);

    return (
        <section id="education" className="portfolio-section">
            <div className="content-container">
            
                <SectionHeader
                    index="02"
                    label="ACADEMICS"
                    title="EDUCATION"
                    subtitle="Academic coursework, theoretical foundations, and performance credentials."
                />

                <Reveal delay={0.15}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
                        
                        {/* College Bento Card (Primary Spotlight - 8 cols) */}
                        {collegeData && (
                            <div className="col-span-1 lg:col-span-8 flex">
                                <BentoCard 
                                    className="w-full p-8 md:p-10 flex flex-col justify-between" 
                                    featured={true}
                                >
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-lg border border-accent/30 bg-accent/[0.08] text-accent">
                                                    <GraduationCap size={26} />
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">
                                                        // UNDERGRADUATE DEGREE
                                                    </span>
                                                    <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary">
                                                        {collegeData.institution}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* CGPA Badge */}
                                            <div className="px-4 py-2 rounded-lg bg-accent/[0.08] border border-accent/30 text-right">
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary block">
                                                    CUMULATIVE GPA
                                                </span>
                                                <span className="font-heading text-2xl font-bold text-accent">
                                                    {collegeData.cgpa} <span className="text-xs font-mono text-text-muted">/ 10.0</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-base md:text-lg text-text-primary font-medium">
                                                {collegeData.degree}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-secondary font-mono mt-2">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-accent" />
                                                    {collegeData.duration}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-accent" />
                                                    {collegeData.location}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Semester SGPA Breakdown */}
                                        {collegeData.semesters && (
                                            <div className="pt-4 border-t border-white/[0.08]">
                                                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-3">
                                                    SEMESTER PERFORMANCE RECORD
                                                </span>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {collegeData.semesters.map((sem, idx) => (
                                                        <div 
                                                            key={idx}
                                                            className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-accent/40 transition-colors"
                                                        >
                                                            <span className="font-mono text-[10px] text-text-muted block uppercase">
                                                                {sem.semester}
                                                            </span>
                                                            <span className="font-mono text-base font-bold text-text-primary mt-0.5 block">
                                                                {sem.sgpa.toFixed(2)} <span className="text-[10px] text-accent">SGPA</span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </BentoCard>
                            </div>
                        )}

                        {/* High School Bento Card (4 cols) */}
                        {schoolData && (
                            <div className="col-span-1 lg:col-span-4 flex">
                                <BentoCard 
                                    className="w-full p-8 flex flex-col justify-between"
                                >
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 rounded-lg border border-white/[0.1] bg-white/[0.04] text-text-secondary">
                                                <School size={24} />
                                            </div>
                                            <div>
                                                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block">
                                                    // SECONDARY EDUCATION
                                                </span>
                                                <h3 className="text-lg md:text-xl font-bold font-display text-text-primary">
                                                    {schoolData.institution}
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm md:text-base text-text-secondary">
                                                {schoolData.degree}
                                            </p>
                                            <div className="flex flex-col gap-1.5 text-xs text-text-muted font-mono mt-3">
                                                <span className="flex items-center gap-2">
                                                    <Calendar size={13} className="text-text-secondary" />
                                                    {schoolData.duration}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin size={13} className="text-text-secondary" />
                                                    {schoolData.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score Callout */}
                                    <div className="pt-6 border-t border-white/[0.08] mt-6">
                                        <div className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                            <div className="flex items-center gap-2">
                                                <Award size={16} className="text-accent" />
                                                <span className="font-mono text-xs text-text-secondary uppercase">
                                                    CBSE Grade 12
                                                </span>
                                            </div>
                                            <span className="font-heading text-xl font-bold text-accent">
                                                {schoolData.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                </BentoCard>
                            </div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Education;