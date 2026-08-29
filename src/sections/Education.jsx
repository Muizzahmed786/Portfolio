import React from "react";
import { GraduationCap, School, Calendar, MapPin } from "lucide-react";
import { education } from "../data/portfolio.js";
import Reveal from "../components/Reveal.jsx";
import BentoCard from '../components/BentoCard.jsx';

const Education = () => {
    const collegeData = education.find(edu => edu.semesters);
    const schoolData = education.find(edu => !edu.semesters);

    return (
        <section id="education" className="relative z-0 scroll-mt-5 bg-transparent overflow-hidden py-16">
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12">
            
            <Reveal className="mb-10">
                <span className="section-eyebrow">
                    background
                </span>
                <h2 className="editorial-heading text-4xl md:text-5xl mt-2 text-text-primary">
                    EDUCATION
                </h2>
            </Reveal>

            <Reveal delay={0.15}>
                <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[220px]">
                    {/* College Bento Card (Primary) */}
                    {collegeData && (
                        <BentoCard 
                            className="flex-1 hover:lg:flex-[1.75]" 
                            featured={true}
                        >
                            <div className="flex flex-col h-full justify-between space-y-8">
                                
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="p-3 inline-block border border-border bg-bg text-accent rounded-sm">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-display text-text-primary">
                                                {collegeData.institution}
                                            </h3>
                                            <p className="text-base text-text-secondary mt-1">
                                                {collegeData.degree}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted font-mono">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-text-secondary" />
                                                {collegeData.duration}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-text-secondary" />
                                                {collegeData.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </BentoCard>
                    )}

                    {/* High School Bento Card */}
                    {schoolData && (
                        <BentoCard 
                            className="flex-1 hover:lg:flex-[1.75] flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <div className="p-3 inline-block border border-border bg-bg text-text-secondary rounded-sm">
                                    <School size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-display text-text-primary">
                                        {schoolData.institution}
                                    </h3>
                                    <p className="text-sm text-text-secondary mt-1">
                                        {schoolData.degree}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 text-xs text-text-muted font-mono">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={14} className="text-text-secondary" />
                                        {schoolData.duration}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={14} className="text-text-secondary" />
                                        {schoolData.location}
                                    </span>
                                </div>
                            </div>
                        </BentoCard>
                    )}
                </div>
            </Reveal>
            </div>
        </section>
    );
};

export default Education;