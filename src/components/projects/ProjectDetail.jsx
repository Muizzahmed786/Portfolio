import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import NavigationRail from './NavigationRail.jsx';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';

const ProjectDetail = ({ 
    project, 
    nextProject,
    state, 
    startRect, 
    onStateChange, 
    onClose,
    onRailClick 
}) => {
    const containerRef = useRef(null);
    const [displayProject, setDisplayProject] = useState(project);
    const progress = useMotionValue(0);
    const [isWiping, setIsWiping] = useState(false);
    
    // Animation 1: FLIP (Opening / Closing)
    useEffect(() => {
        if (!containerRef.current || !startRect) return;

        const el = containerRef.current;
        const duration = 500;
        const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

        if (state === 'opening') {
            // Set initial inline styles to match the captured rect
            el.style.position = 'fixed';
            el.style.top = `${startRect.top}px`;
            el.style.left = `${startRect.left}px`;
            el.style.width = `${startRect.width}px`;
            el.style.height = `${startRect.height}px`;
            el.style.transform = `rotate(-20deg) scale(0.9)`;
            el.style.transformOrigin = 'center center';
            el.style.zIndex = '100';
            el.style.borderRadius = '8px';
            el.style.transition = 'none';

            // Force layout
            el.getBoundingClientRect();

            // Transition to fullscreen
            requestAnimationFrame(() => {
                el.style.transition = `all ${duration}ms ${easing}`;
                el.style.top = '0px';
                el.style.left = '0px';
                el.style.width = '100vw';
                el.style.height = '100vh';
                el.style.transform = `rotate(0deg) scale(1)`;
                el.style.borderRadius = '0px';

                setTimeout(() => {
                    onStateChange('detail');
                }, duration);
            });
        } else if (state === 'closing') {
            // Animate back to original rect
            el.style.transition = `all ${duration}ms ${easing}`;
            el.style.top = `${startRect.top}px`;
            el.style.left = `${startRect.left}px`;
            el.style.width = `${startRect.width}px`;
            el.style.height = `${startRect.height}px`;
            el.style.transform = `rotate(-20deg) scale(0.9)`;
            el.style.borderRadius = '8px';

            setTimeout(() => {
                onStateChange('idle');
            }, duration);
        }
    }, [state, startRect, onStateChange]);

    // Animation 2: Directional Wipe (Switching)
    useEffect(() => {
        if (state === 'switching' && nextProject) {
            setIsWiping(true);
            progress.set(0);

            const duration = 0.6; // 600ms
            const controls = animate(progress, 1, {
                duration: duration,
                ease: [0.22, 1, 0.36, 1], // ease-out-expo
                onUpdate: (latest) => {
                    if (latest >= 0.5 && displayProject.id !== nextProject.id) {
                        // Midpoint: swap content underneath the wipe
                        setDisplayProject(nextProject);
                    }
                },
                onComplete: () => {
                    setIsWiping(false);
                    onStateChange('detail');
                }
            });

            return controls.stop;
        }
    }, [state, nextProject, progress, onStateChange, displayProject.id]);

    // Derived values for the wipe
    // The wipe polygon sweeps from right to left. 
    // It's a trapezoid with a slanted leading edge.
    // 0 to 0.5: sweeping in over the old content.
    // 0.5 to 1.0: clearing out to reveal new content.
    const wipeClipPath = useTransform(progress, [0, 0.5, 1], [
        'polygon(120% 0, 100% 0, 100% 100%, 120% 100%)', // Offscreen right
        'polygon(120% 0, -20% 0, -40% 100%, 120% 100%)', // Full cover (slanted edge passed left)
        'polygon(-20% 0, -20% 0, -40% 100%, -40% 100%)' // Cleared out left
    ]);

    // Headline mask reveals synchronously with the wipe's second half
    const headlineMask = useTransform(progress, [0.5, 1], [
        'polygon(120% 0, 120% 0, 120% 100%, 120% 100%)',
        'polygon(120% 0, -20% 0, -40% 100%, 120% 100%)'
    ]);

    // Content fade delay
    const contentOpacity = state === 'detail' || (state === 'switching' && progress.get() > 0.5) ? 1 : 0;
    const contentY = state === 'detail' || (state === 'switching' && progress.get() > 0.5) ? 0 : 20;

    return (
        <>
            {/* The Main Flipping/Fullscreen Container */}
            <div 
                ref={containerRef}
                className="fixed z-50 overflow-hidden shadow-2xl flex flex-col"
                style={{ 
                    backgroundColor: displayProject.tabColor,
                    // If we're opening or closing, initial rect styles are handled by ref.
                    // If we're detail or switching, force fullscreen.
                    ...(state === 'detail' || state === 'switching' ? {
                        top: 0, left: 0, width: '100vw', height: '100vh', transform: 'none', borderRadius: 0
                    } : {})
                }}
            >
                {/* Slim Nav Bar (Persists in Detail) */}
                <div className="w-full h-16 flex items-center justify-between px-6 md:px-12 border-b border-black/10 shrink-0">
                    <button onClick={onClose} className="text-[#141414] hover:opacity-70 transition-opacity flex items-center gap-2 font-bold uppercase tracking-widest text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                        <ArrowLeft size={16} /> BACK
                    </button>
                    <span className="font-bold uppercase tracking-widest text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>
                        Muizz Ahmed
                    </span>
                    <a href="#about" className="text-[#141414] font-bold uppercase tracking-widest text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-body)' }}>
                        About
                    </a>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative w-full pt-8 md:pt-16 px-4 md:px-12 lg:px-24 pb-32">
                    
                    {/* Giant Name Headline */}
                    <motion.h1 
                        className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-[#F2F2EE] leading-none mb-8 ml-4 md:ml-8"
                        style={{ 
                            fontFamily: 'var(--font-fraunces)',
                            clipPath: isWiping && progress.get() >= 0.5 ? headlineMask : 'none',
                            opacity: (state === 'opening' || state === 'closing') ? 0 : 1,
                            transition: 'opacity 0.3s ease-out 0.2s'
                        }}
                    >
                        {displayProject.title.toUpperCase()}
                    </motion.h1>

                    {/* Content Card (The Paper) */}
                    <div 
                        className="bg-[#FAF8F4] w-full max-w-6xl mx-auto rounded-t-xl rounded-b-md shadow-xl p-8 md:p-16 relative"
                        style={{
                            opacity: contentOpacity,
                            transform: `translateY(${contentY}px)`,
                            transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
                        }}
                    >
                        {/* Dot markers decoration */}
                        <div className="absolute -left-4 md:-left-8 top-16 flex flex-col gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#141414]/30"></div>
                            <div className="w-2 h-2 rounded-full bg-[#141414]/30"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left: Photo / Metadata */}
                            <div className="lg:col-span-5 relative">
                                {/* Paperclip decoration */}
                                <div className="absolute -top-4 -left-4 w-8 h-12 border-2 border-gray-400 rounded-full rotate-12 z-10 hidden md:block"></div>
                                
                                {displayProject.image && (
                                    <div className="w-full bg-[#EAE8E4] p-4 shadow-sm border border-[#E0DED9] rotate-[-1deg]">
                                        <img src={displayProject.image} alt={displayProject.title} className="w-full h-auto grayscale contrast-125 mix-blend-multiply" />
                                    </div>
                                )}

                                <div className="mt-8 space-y-4">
                                    <div className="border-t border-[#141414]/10 pt-4">
                                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#141414]/50 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Type</h3>
                                        <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{displayProject.type}</p>
                                    </div>
                                    <div className="border-t border-[#141414]/10 pt-4">
                                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#141414]/50 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {displayProject.stack.map(tech => (
                                                <span key={tech} className="font-bold text-[10px] uppercase tracking-wider text-[#141414] bg-[#141414]/5 px-2 py-1 rounded-sm" style={{ fontFamily: 'var(--font-body)' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t border-[#141414]/10 pt-4 flex gap-4">
                                        {displayProject.github && (
                                            <a href={displayProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#141414] hover:text-[#141414]/60 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                                                <FaGithub size={14} /> Source
                                            </a>
                                        )}
                                        {displayProject.link && (
                                            <a href={displayProject.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-[#141414] hover:text-[#141414]/60 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                                                <ExternalLink size={14} /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Bio / Description */}
                            <div className="lg:col-span-7">
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-[#141414] text-xl leading-relaxed" style={{ fontFamily: 'var(--font-source-serif)' }}>
                                        {/* Drop cap for first letter */}
                                        <span className="float-left text-6xl md:text-7xl font-bold leading-[0.8] mr-3 mt-2 text-[#141414]" style={{ fontFamily: 'var(--font-fraunces)' }}>
                                            {displayProject.description.charAt(0)}
                                        </span>
                                        {displayProject.description.slice(1)}
                                    </p>
                                    
                                    {displayProject.highlights && displayProject.highlights.length > 0 && (
                                        <div className="mt-8 space-y-4">
                                            {displayProject.highlights.map((highlight, idx) => (
                                                <p key={idx} className="text-[#141414]/80 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-source-serif)' }}>
                                                    {highlight}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wipe Overlay Element */}
                {isWiping && nextProject && (
                    <motion.div 
                        className="absolute inset-0 z-50"
                        style={{ 
                            backgroundColor: nextProject.tabColor,
                            clipPath: wipeClipPath 
                        }}
                    />
                )}
            </div>
            
            {/* Navigation Rail for switching */}
            {(state === 'detail' || state === 'switching') && (
                <NavigationRail 
                    activeProjectId={displayProject.id} 
                    onRailClick={onRailClick} 
                />
            )}
        </>
    );
};

export default ProjectDetail;
