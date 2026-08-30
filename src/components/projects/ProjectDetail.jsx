import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import NavigationRail from './NavigationRail.jsx';
import { motion, useAnimation } from 'framer-motion';

// ─── Shared Animation Constants ───────────────────────────────────────────────
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FLIP_EASING = [0.25, 0.46, 0.45, 0.94]; // ease-out-quad

const ProjectDetail = ({
    project,
    state,
    startRect,
    onStateChange,
    onClose,
    onRailClick
}) => {
    const containerRef = useRef(null);
    
    // Animation controllers
    const folderControls = useAnimation();
    const titleControls = useAnimation();
    const contentControls = useAnimation();

    // ── Physical Opening Sequence ──────────────────────────────────────────────
    useEffect(() => {
        if (state !== 'opening' || !startRect) return;

        const reduced = prefersReducedMotion();

        const sequence = async () => {
            // 1. Instantly snap to the exact tab geometry and shape
            await folderControls.set({
                top: startRect.top,
                left: startRect.left,
                width: startRect.width,
                height: startRect.height,
                clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
                rotate: 0,
                borderRadius: '0px',
                scale: 1,
            });
            await titleControls.set({ opacity: 0, y: -20 });
            await contentControls.set({ opacity: 0, y: 30 });

            if (reduced) {
                // Instantly move to detail state
                folderControls.set({
                    top: 0, left: 0, width: '100dvw', height: '100dvh',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    rotate: 0, borderRadius: '0px',
                });
                titleControls.set({ opacity: 1, y: 0 });
                contentControls.set({ opacity: 1, y: 0 });
                onStateChange('detail');
                return;
            }

            // 2. Physical lift & rotate (pre-open state)
            const isMobile = window.innerWidth < 768;
            folderControls.start({
                top: startRect.top - (isMobile ? 50 : 120), // Lift higher up on desktop, subtle on mobile
                left: startRect.left - (isMobile ? 10 : 40), // Move slightly to the side to create an arc
                rotate: isMobile ? -4 : -8, // more subtle rotation on mobile to fit screen
                clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] } // Custom easing for lift
            });

            // 3. Editorial title begins revealing
            setTimeout(() => {
                titleControls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: FLIP_EASING }
                });
            }, 150);

            // 4. Folder rises, scales, and straightens into position
            setTimeout(() => {
                folderControls.start({
                    top: 0,
                    left: 0,
                    width: '100dvw',
                    height: '100dvh',
                    rotate: 0,
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Deceleration ease
                }).then(() => {
                    onStateChange('detail');
                });
            }, 300);

            // 5. Content card fades in and settles just before folder finishes moving
            setTimeout(() => {
                contentControls.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: FLIP_EASING }
                });
            }, 600);
        };

        sequence();
    }, [state, startRect, folderControls, titleControls, contentControls, onStateChange]);

    // ── Physical Closing Sequence ──────────────────────────────────────────────
    useEffect(() => {
        if ((state !== 'closing' && state !== 'switching-out') || !startRect) return;

        const reduced = prefersReducedMotion();

        const sequence = async () => {
            if (reduced) {
                folderControls.set({
                    top: startRect.top, left: startRect.left,
                    width: startRect.width, height: startRect.height,
                    clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
                    rotate: 0,
                });
                onStateChange(state === 'closing' ? 'idle' : 'archive-transition');
                return;
            }

            // 1. Content settles away
            contentControls.start({
                opacity: 0,
                y: 30,
                transition: { duration: 0.3, ease: 'easeOut' }
            });
            titleControls.start({
                opacity: 0,
                y: -20,
                transition: { duration: 0.4, ease: 'easeOut' }
            });

            // 2. Folder shrinks and rotates back
            setTimeout(() => {
                const isMobile = window.innerWidth < 768;
                folderControls.start({
                    top: startRect.top - (isMobile ? 50 : 120),
                    left: startRect.left - (isMobile ? 10 : 40),
                    width: startRect.width,
                    height: startRect.height,
                    rotate: isMobile ? -4 : -8,
                    clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
                    transition: { duration: 0.6, ease: FLIP_EASING }
                });
            }, 100);

            // 3. Final snap back to tab geometry
            setTimeout(() => {
                folderControls.start({
                    top: startRect.top,
                    left: startRect.left,
                    rotate: 0,
                    clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
                    transition: { duration: 0.3, ease: 'easeInOut' }
                }).then(() => {
                    onStateChange(state === 'closing' ? 'idle' : 'archive-transition');
                });
            }, 600);
        };

        sequence();
    }, [state, startRect, folderControls, titleControls, contentControls, onStateChange]);

    // ── Force fullscreen styles when in 'detail' state ───
    useEffect(() => {
        if (state === 'detail') {
            folderControls.set({
                top: 0, left: 0, width: '100dvw', height: '100dvh',
                rotate: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            });
            titleControls.set({ opacity: 1, y: 0 });
            contentControls.set({ opacity: 1, y: 0 });
        }
    }, [state, folderControls, titleControls, contentControls]);

    return (
        <>
            {/* ── Main Folder Container ── */}
            <motion.div
                ref={containerRef}
                animate={folderControls}
                className="fixed z-[60] flex flex-col overflow-hidden will-change-transform"
                data-archive-container
                style={{ backgroundColor: project.tabColor }}
                role="dialog"
                aria-modal="true"
                aria-label={`Project: ${project.title}`}
            >
                {/* ── Nav bar ── */}
                <motion.nav
                    animate={contentControls}
                    className="relative w-full shrink-0 flex flex-col md:flex-row md:items-center justify-between border-b"
                    style={{ borderColor: 'rgba(20,20,20,0.12)' }}
                >
                    {/* Top row (always visible) / Left side (desktop) */}
                    <div className="flex items-center justify-between h-14 px-5 md:px-10 w-full md:w-auto relative">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 text-[#141414] hover:opacity-60 transition-opacity font-bold uppercase tracking-[0.1em] text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/40 rounded"
                            style={{ fontFamily: 'var(--font-body)' }}
                            aria-label="Close project and return to archive"
                        >
                            <ArrowLeft size={14} strokeWidth={2.5} />
                            Back
                        </button>
                    </div>

                    {/* Name - Centered globally in the top row */}
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-[20px] md:top-1/2 md:-translate-y-1/2 font-bold uppercase tracking-[0.18em] text-[11px] text-[#141414] pointer-events-none"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Muizz Ahmed
                    </span>

                    {/* Navigation Rail - Row 2 on mobile / Right side on desktop */}
                    <div className="flex items-center justify-center md:justify-end h-12 md:h-14 px-5 md:px-10 w-full md:w-auto border-t md:border-t-0 border-[#141414]/10">
                        <NavigationRail
                            activeProjectId={project.id}
                            onRailClick={onRailClick}
                            state={state}
                        />
                    </div>
                </motion.nav>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
                    <div className="relative w-full px-5 md:px-12 lg:px-20 pt-6 md:pt-10 pb-40 md:pb-48 lg:pb-56 max-w-[1440px] mx-auto">

                        {/* Giant headline */}
                        <motion.h1
                            animate={titleControls}
                            className="font-bold leading-[0.9] uppercase mb-8 md:mb-12 pr-20 md:pr-32"
                        >
                            <span className="block text-[#141414]/90" style={{
                                fontFamily: 'var(--font-fraunces)',
                                fontSize: 'clamp(2.5rem, 9vw, 9rem)', // slightly smaller on mobile to fit
                                letterSpacing: '-0.02em',
                            }}>
                                {project.title}
                            </span>
                        </motion.h1>

                        {/* Content card */}
                        <motion.div
                            animate={contentControls}
                            className="relative bg-[#FAF8F4] w-full rounded-lg md:rounded-xl shadow-[0_8px_48px_rgba(0,0,0,0.18)] p-6 md:p-12 lg:p-16"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                                {/* ── Left: image + metadata ── */}
                                <div className="lg:col-span-4 relative">
                                    {/* Decorative paperclip */}
                                    <div
                                        className="absolute -top-3 left-6 w-6 h-10 border-[2.5px] border-[#141414]/25 rounded-full rotate-12 z-10 hidden md:block"
                                        aria-hidden="true"
                                    />

                                    {project.image ? (
                                        <div className="relative w-full bg-[#E8E5E0] p-3 shadow-sm border border-[#D8D5D0] rotate-[-0.8deg]">
                                            <img
                                                src={project.image}
                                                alt={`Screenshot of ${project.title}`}
                                                className="w-full h-auto block grayscale contrast-[1.15]"
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[4/3] bg-[#E8E5E0] border border-[#D8D5D0] flex items-center justify-center">
                                            <span className="font-bold text-[#141414]/30 uppercase tracking-widest text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                                                No Preview
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-6 space-y-0 divide-y divide-[#141414]/8">
                                        <div className="py-3">
                                            <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Type</p>
                                            <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{project.type}</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Year</p>
                                            <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{project.year}</p>
                                        </div>
                                        {project.status && (
                                            <div className="py-3">
                                                <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Status</p>
                                                <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{project.status}</p>
                                            </div>
                                        )}
                                        <div className="py-3">
                                            <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Stack</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="font-bold text-[10px] uppercase tracking-wider text-[#141414] bg-[#141414]/6 border border-[#141414]/10 px-2 py-1"
                                                        style={{ fontFamily: 'var(--font-body)' }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="py-4 flex gap-5">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-[0.1em] text-[#141414] hover:opacity-60 transition-opacity"
                                                    style={{ fontFamily: 'var(--font-body)' }}
                                                >
                                                    <FaGithub size={13} /> Source
                                                </a>
                                            )}
                                            {project.link && project.link !== '' && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-[0.1em] text-[#141414] hover:opacity-60 transition-opacity"
                                                    style={{ fontFamily: 'var(--font-body)' }}
                                                >
                                                    <ExternalLink size={13} /> Live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ── Right: description ── */}
                                <div className="lg:col-span-8">
                                    {/* Drop-cap paragraph */}
                                    <p className="text-[#141414] text-[1.125rem] md:text-[1.2rem] leading-[1.72]" style={{ fontFamily: 'var(--font-source-serif)' }}>
                                        <span
                                            className="float-left leading-[0.82] mr-2 mt-1 text-[#141414] select-none"
                                            style={{
                                                fontFamily: 'var(--font-fraunces)',
                                                fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                                                fontWeight: 800,
                                            }}
                                        >
                                            {project.description.charAt(0)}
                                        </span>
                                        {project.description.slice(1)}
                                    </p>

                                    {project.highlights && project.highlights.length > 0 && (
                                        <div className="mt-8 space-y-5">
                                            {project.highlights.map((h, i) => (
                                                <p
                                                    key={i}
                                                    className="text-[#141414]/75 text-[1.05rem] md:text-[1.1rem] leading-[1.75]"
                                                    style={{ fontFamily: 'var(--font-source-serif)' }}
                                                >
                                                    {h}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── Removed Floating Navigation Rail ── */}
            {/* The project navigation is now located in the top <nav> header. */}
        </>
    );
};

export default ProjectDetail;
