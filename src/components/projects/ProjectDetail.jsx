import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import NavigationRail from './NavigationRail.jsx';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// ─── Shared Animation Constants ───────────────────────────────────────────────
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FLIP_DURATION_MS   = 520;
const FLIP_EASING        = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // ease-out-quad — fast start, smooth finish
const WIPE_DURATION_S    = 0.58;
const WIPE_EASE          = [0.25, 0.46, 0.45, 0.94];
const CONTENT_DELAY_S    = 0.18; // seconds after shape starts before content fades in

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

    // ── Sync displayProject when the project prop changes (on switch complete) ──
    useEffect(() => {
        if (state === 'detail' && project.id !== displayProject.id) {
            setDisplayProject(project);
        }
    }, [project, state, displayProject.id]);

    // ── FLIP: Opening ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (state !== 'opening' || !containerRef.current || !startRect) return;

        const el = containerRef.current;
        const reduced = prefersReducedMotion();
        const duration = reduced ? 1 : FLIP_DURATION_MS;
        const easing   = reduced ? 'linear' : FLIP_EASING;

        // Phase 1: Snap to captured rect (no transition)
        el.style.transition = 'none';
        el.style.position    = 'fixed';
        el.style.top         = `${startRect.top}px`;
        el.style.left        = `${startRect.left}px`;
        el.style.width       = `${startRect.width}px`;
        el.style.height      = `${startRect.height}px`;
        el.style.borderRadius = '6px';
        el.style.transform   = `rotate(-18deg) scale(0.88)`;
        el.style.transformOrigin = 'center center';

        // Force a style recalc before starting the transition
        void el.getBoundingClientRect();

        // Phase 2: Animate to fullscreen on next frame
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = [
                    `top ${duration}ms ${easing}`,
                    `left ${duration}ms ${easing}`,
                    `width ${duration}ms ${easing}`,
                    `height ${duration}ms ${easing}`,
                    `transform ${duration}ms ${easing}`,
                    `border-radius ${duration}ms ${easing}`,
                ].join(', ');

                el.style.top          = '0px';
                el.style.left         = '0px';
                el.style.width        = '100dvw';
                el.style.height       = '100dvh';
                el.style.transform    = 'rotate(0deg) scale(1)';
                el.style.borderRadius = '0px';

                const t = setTimeout(() => onStateChange('detail'), duration + 20);
                return () => clearTimeout(t);
            });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    // ── FLIP: Closing ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (state !== 'closing' || !containerRef.current || !startRect) return;

        const el = containerRef.current;
        const reduced = prefersReducedMotion();
        const duration = reduced ? 1 : FLIP_DURATION_MS;
        const easing   = reduced ? 'linear' : FLIP_EASING;

        // Clear any lingering declarative fullscreen styles then animate
        el.style.transition = [
            `top ${duration}ms ${easing}`,
            `left ${duration}ms ${easing}`,
            `width ${duration}ms ${easing}`,
            `height ${duration}ms ${easing}`,
            `transform ${duration}ms ${easing}`,
            `border-radius ${duration}ms ${easing}`,
        ].join(', ');

        el.style.top          = `${startRect.top}px`;
        el.style.left         = `${startRect.left}px`;
        el.style.width        = `${startRect.width}px`;
        el.style.height       = `${startRect.height}px`;
        el.style.transform    = 'rotate(-18deg) scale(0.88)';
        el.style.borderRadius = '6px';

        const t = setTimeout(() => onStateChange('idle'), duration + 20);
        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    // ── Force fullscreen styles when reaching 'detail' or 'switching' state ───
    useEffect(() => {
        if ((state === 'detail' || state === 'switching') && containerRef.current) {
            const el = containerRef.current;
            el.style.transition   = 'none';
            el.style.top          = '0px';
            el.style.left         = '0px';
            el.style.width        = '100dvw';
            el.style.height       = '100dvh';
            el.style.transform    = 'none';
            el.style.borderRadius = '0px';
        }
    }, [state]);

    // ── Wipe: Switching ────────────────────────────────────────────────────────
    const swappedRef = useRef(false);

    useEffect(() => {
        if (state !== 'switching' || !nextProject) return;

        swappedRef.current = false;
        setIsWiping(true);
        progress.set(0);

        const controls = animate(progress, 1, {
            duration: WIPE_DURATION_S,
            ease: WIPE_EASE,
            onUpdate: (v) => {
                if (v >= 0.5 && !swappedRef.current) {
                    swappedRef.current = true;
                    setDisplayProject(nextProject);
                }
            },
            onComplete: () => {
                setIsWiping(false);
                onStateChange('detail');
            },
        });

        return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, nextProject]);

    // ── Wipe clip-path — drives both the background sweep and headline mask ───
    // 0 → 0.5: trapezoid sweeps from right edge to fully covering the viewport
    // 0.5 → 1: trapezoid clears off to the left, revealing new content
    const SLANT = '12%'; // how much the leading edge is angled

    const wipeClipPath = useTransform(progress, [0, 0.5, 1], [
        `polygon(calc(100% + 60px) 0, 100% 0, 100% 100%, calc(100% + 60px) 100%)`,
        `polygon(calc(100% + 60px) 0, -${SLANT} 0, calc(-${SLANT} - 60px) 100%, calc(100% + 60px) 100%)`,
        `polygon(-${SLANT} 0, -${SLANT} 0, calc(-${SLANT} - 60px) 100%, calc(-${SLANT} - 60px) 100%)`,
    ]);

    // Headline unmask: runs in the second half (0.5 → 1), matching the wipe's reveal
    const headlineClipPath = useTransform(progress, [0.5, 1], [
        `polygon(calc(100% + 60px) 0, 100% 0, 100% 100%, calc(100% + 60px) 100%)`,
        `polygon(calc(100% + 60px) 0, -${SLANT} 0, calc(-${SLANT} - 60px) 100%, calc(100% + 60px) 100%)`,
    ]);

    // ── Content entrance — reactive via motion values ──────────────────────────
    const contentOpacity = useMotionValue(0);
    const contentY = useMotionValue(16);

    useEffect(() => {
        if (state === 'detail') {
            const t = setTimeout(() => {
                animate(contentOpacity, 1, { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] });
                animate(contentY, 0, { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] });
            }, CONTENT_DELAY_S * 1000);
            return () => clearTimeout(t);
        } else if (state === 'opening' || state === 'closing') {
            contentOpacity.set(0);
            contentY.set(16);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    // After wipe swap, fade new content in
    useEffect(() => {
        if (!isWiping && state === 'detail') {
            contentOpacity.set(0);
            contentY.set(16);
            const t = setTimeout(() => {
                animate(contentOpacity, 1, { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] });
                animate(contentY, 0, { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] });
            }, 60);
            return () => clearTimeout(t);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayProject.id]);

    // Headline visibility — hide during FLIP travel, show once settled
    const headlineOpacity = state === 'opening' || state === 'closing' ? 0 : 1;

    // ── Wipe: determine the correct headline clip-path ────────────────────────
    // Only apply the animated clip when the wipe is in the reveal phase
    const headlineStyle = isWiping
        ? { clipPath: headlineClipPath, opacity: 1 }
        : { opacity: headlineOpacity, transition: `opacity 0.3s ease ${CONTENT_DELAY_S * 0.5}s` };

    return (
        <>
            {/* ── Main FLIP container ── */}
            <div
                ref={containerRef}
                className="fixed z-[60] flex flex-col overflow-hidden will-change-transform"
                data-archive-container
                style={{ backgroundColor: displayProject.tabColor }}
                role="dialog"
                aria-modal="true"
                aria-label={`Project: ${displayProject.title}`}
            >
                {/* ── Nav bar ── */}
                <nav
                    className="relative w-full shrink-0 h-14 flex items-center justify-between px-5 md:px-10 border-b"
                    style={{ borderColor: 'rgba(20,20,20,0.12)' }}
                >
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-[#141414] hover:opacity-60 transition-opacity font-bold uppercase tracking-[0.1em] text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/40 rounded"
                        style={{ fontFamily: 'var(--font-body)' }}
                        aria-label="Close project and return to archive"
                    >
                        <ArrowLeft size={14} strokeWidth={2.5} />
                        Back
                    </button>

                    <span
                        className="absolute left-1/2 -translate-x-1/2 font-bold uppercase tracking-[0.18em] text-[11px] text-[#141414]"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Muizz Ahmed
                    </span>

                    <a
                        href="#about"
                        className="font-bold uppercase tracking-[0.1em] text-[11px] text-[#141414] hover:opacity-60 transition-opacity"
                        style={{ fontFamily: 'var(--font-body)' }}
                        onClick={(e) => { e.preventDefault(); onClose(); }}
                    >
                        Archive
                    </a>
                </nav>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
                    <div className="relative w-full px-5 md:px-12 lg:px-20 pt-10 md:pt-16 pb-24 max-w-[1440px] mx-auto">

                        {/* Giant headline */}
                        <motion.h1
                            style={headlineStyle}
                            className="font-bold leading-[0.9] uppercase mb-8 md:mb-12 pr-20 md:pr-32"
                        >
                            <span style={{
                                fontFamily: 'var(--font-fraunces)',
                                fontSize: 'clamp(3rem, 10vw, 9rem)',
                                display: 'block',
                                color: 'rgba(20,20,20,0.88)',
                                letterSpacing: '-0.02em',
                            }}>
                                {displayProject.title}
                            </span>
                        </motion.h1>

                        {/* Content card */}
                        <motion.div
                            style={{ opacity: contentOpacity, y: contentY }}
                            className="relative bg-[#FAF8F4] w-full rounded-lg md:rounded-xl shadow-[0_8px_48px_rgba(0,0,0,0.18)] p-6 md:p-12 lg:p-16"
                        >
                            {/* Left-column dot markers */}
                            <div className="hidden md:flex absolute -left-5 top-12 flex-col gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#141414]/20" />
                                <div className="w-2 h-2 rounded-full bg-[#141414]/20" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                                {/* ── Left: image + metadata ── */}
                                <div className="lg:col-span-4 relative">
                                    {/* Decorative paperclip */}
                                    <div
                                        className="absolute -top-3 left-6 w-6 h-10 border-[2.5px] border-[#141414]/25 rounded-full rotate-12 z-10 hidden md:block"
                                        aria-hidden="true"
                                    />

                                    {displayProject.image ? (
                                        <div className="relative w-full bg-[#E8E5E0] p-3 shadow-sm border border-[#D8D5D0] rotate-[-0.8deg]">
                                            <img
                                                src={displayProject.image}
                                                alt={`Screenshot of ${displayProject.title}`}
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
                                            <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{displayProject.type}</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Year</p>
                                            <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{displayProject.year}</p>
                                        </div>
                                        {displayProject.status && (
                                            <div className="py-3">
                                                <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Status</p>
                                                <p className="font-bold text-sm text-[#141414]" style={{ fontFamily: 'var(--font-body)' }}>{displayProject.status}</p>
                                            </div>
                                        )}
                                        <div className="py-3">
                                            <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[#141414]/45 mb-2" style={{ fontFamily: 'var(--font-body)' }}>Stack</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {displayProject.stack.map((tech) => (
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
                                            {displayProject.github && (
                                                <a
                                                    href={displayProject.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-[0.1em] text-[#141414] hover:opacity-60 transition-opacity"
                                                    style={{ fontFamily: 'var(--font-body)' }}
                                                >
                                                    <FaGithub size={13} /> Source
                                                </a>
                                            )}
                                            {displayProject.link && displayProject.link !== '' && (
                                                <a
                                                    href={displayProject.link}
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
                                            {displayProject.description.charAt(0)}
                                        </span>
                                        {displayProject.description.slice(1)}
                                    </p>

                                    {displayProject.highlights && displayProject.highlights.length > 0 && (
                                        <div className="mt-8 space-y-5">
                                            {displayProject.highlights.map((h, i) => (
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

                {/* ── Wipe overlay (child of container so it's clipped with it during FLIP) ── */}
                {isWiping && nextProject && (
                    <motion.div
                        className="absolute inset-0 z-[70] pointer-events-none"
                        style={{
                            backgroundColor: nextProject.tabColor,
                            clipPath: wipeClipPath,
                            willChange: 'clip-path',
                        }}
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* ── Navigation Rail (outside the container so it sits over everything) ── */}
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
