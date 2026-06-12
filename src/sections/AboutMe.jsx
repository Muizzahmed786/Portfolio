import React from 'react';
// Importing standard, predictable icons from Font Awesome 6
import { FaRegFileLines, FaGithub, FaLinkedinIn } from 'react-icons/fa6'; 
import LightRays from '../animations/LightRays.jsx';
import ProfileCard from '../components/ProfileCardComponent.jsx';
import { personal } from '../data/portfolio.js';

const AboutMe = () => {
    return (
        <section id='about' className='relative min-h-screen z-0 scroll-mt-24 bg-black overflow-hidden'>
            {/* Background Animation Layer */}
            <div className="absolute inset-0 pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>

            <div className="relative z-10 text-white min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 pt-24 pb-12">
                
                {/* Bio */}
                <div className="w-full md:w-1/2 space-y-8 order-2 md:order-1">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Hi, I'm <span className="text-yellow-400">{personal.name}</span>
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {personal.bio}
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-4 pt-2'>
                        <a 
                            href="/resume.pdf" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 font-medium border border-yellow-400/30 hover:border-yellow-400/50 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300 cursor-pointer group'
                        >
                            <FaRegFileLines size={18} className="group-hover:scale-110 transition-transform duration-300" />
                            <span>Resume</span>
                        </a>

                        <a 
                            href={personal.github} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer group'
                        >
                            <FaGithub size={18} className="group-hover:scale-110 transition-transform duration-300" />
                            <span>GitHub</span>
                        </a>

                        <a 
                            href={personal.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer group'
                        >
                            <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform duration-300" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
                    <ProfileCard
                        name={personal.name}
                        title={personal.role}
                        handle={personal.handle}
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl=""
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={true}
                        onContactClick={() => window.open(`mailto:${personal.e}`)}
                        behindGlowColor="rgba(125, 190, 255, 0.67)"
                        iconUrl=""
                        behindGlowEnabled
                        innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;