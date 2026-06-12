import React from "react";
import { FaGraduationCap, FaSchool, FaCalendarDays, FaLocationDot, FaTimeline } from "react-icons/fa6";
import { education } from "../data/portfolio.js";

const Education = () => {
    // Safely grabbing the college data for the horizontal timeline
    const collegeData = education.find(edu => edu.semesters);

    return (
        <section id="education" className="text-white min-h-screen scroll-mt-5 max-w-7xl mx-auto px-6 md:px-12 py-24 bg-black">
            
            {/* Section Header */}
            <div className="mb-16">
                <h2 className="text-4xl font-bold tracking-tight inline-flex items-center gap-3">
                    <FaGraduationCap className="text-yellow-400" />
                    <span>Education</span>
                </h2>
                <div className="h-1 w-20 bg-yellow-400/50 rounded-full mt-2"></div>
            </div>

            {/* Top Row: School & College side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {education.map((item, index) => (
                    <div 
                        key={index} 
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] transition-all duration-300 group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors duration-300">
                                {item.semesters ? <FaGraduationCap size={22} /> : <FaSchool size={22} />}
                            </div>
                            
                            <div className="space-y-2 flex-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                                    {item.institution}
                                </h3>
                                <p className="text-lg text-gray-300 font-medium">
                                    {item.degree}
                                </p>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <FaCalendarDays size={14} className="text-yellow-400/70" />
                                        {item.duration}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaLocationDot size={14} className="text-yellow-400/70" />
                                        {item.location}
                                    </span>
                                </div>

                                {/* Score Badges */}
                                <div className="pt-4">
                                    {item.cgpa ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-400/10 text-yellow-400 text-sm font-semibold border border-yellow-400/20">
                                            CGPA: {item.cgpa}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-sm font-semibold border border-white/10">
                                            Percentage: {item.percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider Line */}
            <hr className="border-white/10 mb-16" />

            {/* Bottom Row: Horizontal Semester Timeline */}
            {collegeData && collegeData.semesters && (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-x-auto custom-scrollbar">
                    <h3 className="text-xl font-bold mb-12 flex items-center gap-2">
                        <FaTimeline className="text-yellow-400" />
                        <span>Semester-wise Performance</span>
                    </h3>

                    {/* Horizontal Track */}
                    <div className="relative min-w-150 pt-8 pb-4">
                        {/* The Horizontal Line spanning the grid width */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 rounded"></div>

                        {/* Flex Container Grid representing milestones */}
                        <div className="flex justify-between items-start relative">
                            {collegeData.semesters.map((sem, sIdx) => (
                                <div key={sIdx} className="flex flex-col items-center flex-1 group relative">
                                    
                                    {/* Timeline Node Point (Positioned right on top of the line) */}
                                    <div className="absolute -top-9.25 w-4 h-4 rounded-full bg-black border-2 border-yellow-400 group-hover:bg-yellow-400 transition-colors duration-300 shadow-[0_0_8px_rgba(234,179,8,0.5)] z-10"></div>
                                    
                                    {/* Semester Entry Box */}
                                    <div className="text-center space-y-2 p-3 rounded-xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 w-35">
                                        <span className="block text-sm text-gray-400 group-hover:text-white font-medium transition-colors">
                                            {sem.semester}
                                        </span>
                                        <span className="inline-block font-mono text-xs px-2 py-0.5 rounded-md bg-yellow-400/10 text-yellow-400 font-semibold border border-yellow-400/20">
                                            SGPA: {sem.sgpa.toFixed(2)}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default Education;