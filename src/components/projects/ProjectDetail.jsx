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
            // Because startRect is now { rect, tabRect }, we can accurately draw the initial folder shape!
            const bounds = startRect.rect;
            const tab = startRect.tabRect;
            
            const tabLeft = tab.left - bounds.left;
            const tabRight = tab.right - bounds.left;
            const tabHeight = tab.height;

            // 8-point polygon representing the FolderLayer (tab + body)
            const initialClipPath = `polygon(
                0% ${tabHeight}px, 
                ${tabLeft + 12}px ${tabHeight}px, 
                ${tabLeft + 24}px 0px, 
                ${tabRight - 24}px 0px, 
                ${tabRight - 12}px ${tabHeight}px, 
                100% ${tabHeight}px, 
                100% 100%, 
                0% 100%
            )`;

            // 8-point polygon representing a full rectangle
            const finalClipPath = `polygon(
                0% 0%, 
                0% 0%, 
                0% 0%, 
                100% 0%, 
                100% 0%, 
                100% 0%, 
                100% 100%, 
                0% 100%
            )`;

            // 1. Instantly snap to the exact folder geometry and shape
            await folderControls.set({
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
                clipPath: initialClipPath,
                rotate: 0,
                borderRadius: '8px',
                scale: 1,
            });
            await titleControls.set({ opacity: 0, y: -20 });
            await contentControls.set({ opacity: 0, y: 30 });

            if (reduced) {
                // Instantly move to detail state
                folderControls.set({
                    top: 0, left: 0, width: '100dvw', height: '100dvh',
                    clipPath: finalClipPath,
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
                top: bounds.top - (isMobile ? 50 : 120), // Lift higher up on desktop, subtle on mobile
                left: bounds.left - (isMobile ? 10 : 40), // Move slightly to the side to create an arc
                rotate: isMobile ? -4 : -8, // more subtle rotation on mobile to fit screen
                clipPath: initialClipPath, // Keep original folder shape while lifting
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
                    clipPath: finalClipPath,
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
            const bounds = startRect.rect;
            const tab = startRect.tabRect;
            
            const tabLeft = tab.left - bounds.left;
            const tabRight = tab.right - bounds.left;
            const tabHeight = tab.height;

            const initialClipPath = `polygon(
                0% ${tabHeight}px, 
                ${tabLeft + 12}px ${tabHeight}px, 
                ${tabLeft + 24}px 0px, 
                ${tabRight - 24}px 0px, 
                ${tabRight - 12}px ${tabHeight}px, 
                100% ${tabHeight}px, 
                100% 100%, 
                0% 100%
            )`;

            const finalClipPath = `polygon(
                0% 0%, 
                0% 0%, 
                0% 0%, 
                100% 0%, 
                100% 0%, 
                100% 0%, 
                100% 100%, 
                0% 100%
            )`;

            if (reduced) {
                folderControls.set({
                    top: bounds.top, left: bounds.left,
                    width: bounds.width, height: bounds.height,
                    clipPath: initialClipPath,
                    borderRadius: '8px',
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
                    top: bounds.top - (isMobile ? 50 : 120),
                    left: bounds.left - (isMobile ? 10 : 40),
                    width: bounds.width,
                    height: bounds.height,
                    rotate: isMobile ? -4 : -8,
                    clipPath: initialClipPath,
                    borderRadius: '8px',
                    transition: { duration: 0.6, ease: FLIP_EASING }
                });
            }, 100);

            // 3. Final snap back to folder geometry
            setTimeout(() => {
                folderControls.start({
                    top: bounds.top,
                    left: bounds.left,
                    rotate: 0,
                    clipPath: initialClipPath,
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
                className="fixed z-[60] flex flex-col overflow-hidden will-change-transform bg-[#0E0F12]"
                data-archive-container
                style={{ backgroundColor: '#0E0F12' }}
                role="dialog"
                aria-modal="true"
                aria-label={`Project: ${project.title}`}
            >
                {/* ── Nav bar ── */}
                <motion.nav
                    animate={contentControls}
                    className="relative w-full shrink-0 flex flex-col md:flex-row md:items-center justify-between border-b bg-[#121316]/90 backdrop-blur-md"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                    {/* Top row (always visible) / Left side (desktop) */}
                    <div className="flex items-center justify-between h-14 px-5 md:px-10 w-full md:w-auto relative">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors font-mono font-bold uppercase tracking-[0.1em] text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded cursor-pointer"
                            aria-label="Close project and return to archive"
                        >
                            <ArrowLeft size={15} strokeWidth={2.5} />
                            BACK TO ARCHIVE
                        </button>
                    </div>

                    {/* Name - Centered globally in the top row */}
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-[20px] md:top-1/2 md:-translate-y-1/2 font-mono font-bold uppercase tracking-[0.2em] text-[11px] text-white/50 pointer-events-none hidden md:block"
                    >
                        MUIZZ AHMED // TECHNICAL DOSSIER
                    </span>

                    {/* Navigation Rail - Row 2 on mobile / Right side on desktop */}
                    <div className="flex items-center justify-center md:justify-end h-12 md:h-14 px-5 md:px-10 w-full md:w-auto border-t md:border-t-0 border-white/10">
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
                            <span className="block text-text-primary" style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
                                letterSpacing: '-0.02em',
                            }}>
                                {project.title}
                            </span>
                        </motion.h1>

                        {/* Content card (Dark Technical Dossier) */}
                        <motion.div
                            animate={contentControls}
                            className="relative bg-[#141518] border border-white/[0.08] w-full rounded-lg md:rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-6 md:p-12 lg:p-16"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                                {/* ── Left: image + metadata ── */}
                                <div className="lg:col-span-4 relative">
                                    {project.image ? (
                                        <div className="relative w-full bg-[#0D0E10] p-3 shadow-md border border-white/10 rounded-md">
                                            <img
                                                src={project.image}
                                                alt={`Screenshot of ${project.title}`}
                                                className="w-full h-auto block rounded-sm contrast-[1.05]"
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[4/3] bg-[#0D0E10] border border-white/10 rounded-md flex items-center justify-center">
                                            <span className="font-mono font-bold text-white/30 uppercase tracking-widest text-xs">
                                                No Preview Available
                                            </span>
                                        </div>
                                    )}

                                    <div className="mt-6 space-y-0 divide-y divide-white/[0.08]">
                                        <div className="py-3">
                                            <p className="font-mono font-bold text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">Type</p>
                                            <p className="font-mono text-sm text-text-primary">{project.type}</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="font-mono font-bold text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">Year</p>
                                            <p className="font-mono text-sm text-text-primary">{project.year}</p>
                                        </div>
                                        {project.status && (
                                            <div className="py-3">
                                                <p className="font-mono font-bold text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">Status</p>
                                                <p className="font-mono text-sm text-emerald-400 font-semibold">{project.status}</p>
                                            </div>
                                        )}
                                        <div className="py-3">
                                            <p className="font-mono font-bold text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">Stack</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="font-mono text-[10px] uppercase tracking-wider text-white/80 bg-white/[0.04] border border-white/10 px-2 py-1 rounded"
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
                                                    className="flex items-center gap-1.5 font-mono font-bold text-xs uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors"
                                                >
                                                    <FaGithub size={13} /> Source
                                                </a>
                                            )}
                                            {project.link && project.link !== '' && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 font-mono font-bold text-xs uppercase tracking-[0.1em] text-emerald-400 hover:text-emerald-300 transition-colors"
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
                                    <p className="text-text-primary text-[1.1rem] md:text-[1.18rem] leading-[1.75] font-light font-body">
                                        <span
                                            className="float-left leading-[0.82] mr-3 mt-1 text-emerald-400 font-display font-bold select-none text-[3.8rem] md:text-[4.5rem]"
                                        >
                                            {project.description.charAt(0)}
                                        </span>
                                        {project.description.slice(1)}
                                    </p>

                                    {project.highlights && project.highlights.length > 0 && (
                                        <div className="mt-8 space-y-5 pt-6 border-t border-white/[0.08]">
                                            <h4 className="font-mono text-xs text-white/50 uppercase tracking-widest">// IMPLEMENTATION HIGHLIGHTS</h4>
                                            {project.highlights.map((h, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="text-emerald-400 font-mono font-bold mt-1 text-xs select-none">//</span>
                                                    <p className="text-text-secondary text-[1rem] md:text-[1.05rem] leading-[1.7] font-light">
                                                        {h}
                                                    </p>
                                                </div>
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
