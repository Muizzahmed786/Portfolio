import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

const getStatusBadgeStyle = (status) => {
    switch (status?.toUpperCase()) {
        case 'COMPLETED':
            return {
                bg: 'bg-emerald-500/10',
                text: 'text-emerald-400',
                border: 'border-emerald-500/25',
                dot: '#10B981',
            };
        case 'ACTIVE':
            return {
                bg: 'bg-cyan-500/10',
                text: 'text-cyan-400',
                border: 'border-cyan-500/25',
                dot: '#06B6D4',
            };
        case 'IN DEVELOPMENT':
        default:
            return {
                bg: 'bg-amber-500/10',
                text: 'text-amber-400',
                border: 'border-amber-500/25',
                dot: '#F59E0B',
            };
    }
};

const FolderLayer = ({ 
    project, 
    index, 
    onClick, 
    disabled = false, 
    state = 'idle', 
    activeProjectId = null 
}) => {
    const layerRef = useRef(null);
    const tabRef = useRef(null);

    const handleClick = () => {
        if (disabled || !layerRef.current || !tabRef.current) return;
        const rect = layerRef.current.getBoundingClientRect();
        const tabRect = tabRef.current.getBoundingClientRect();
        onClick(project.id, { rect, tabRect });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    const handleExternalLink = (e, url) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const isArchiveActive = state === 'idle' || state === 'archive-transition';
    const isThisActive = project.id === activeProjectId;
    const statusStyle = getStatusBadgeStyle(project.status);

    // Responsive Bento span mapping
    // index 0: Featured Project (ConceptMap) -> 7 cols on lg
    // index 1: Event Platform (Aurora'26) -> 5 cols on lg
    // index 2: Developer Tool (GitCompass) -> 12 cols (panoramic)
    const bentoSpanClass = index === 0 
        ? 'col-span-12 lg:col-span-7' 
        : index === 1 
            ? 'col-span-12 lg:col-span-5' 
            : 'col-span-12';

    return (
        <motion.div
            ref={layerRef}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-label={`Project dossier: ${project.title}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            data-tab-id={project.id}
            initial={false}
            animate={{
                opacity: (!isArchiveActive && !isThisActive) ? 0.35 : 
                         (!isArchiveActive && isThisActive) ? 0 : 1,
            }}
            transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={[
                'relative w-full h-full flex flex-col pt-8 group focus:outline-none',
                bentoSpanClass,
                !disabled ? 'cursor-pointer' : 'cursor-default'
            ].join(' ')}
        >
            {/* ── Dossier Folder Tab ── */}
            <div 
                ref={tabRef}
                className="absolute top-0 left-4 md:left-6 h-8 px-4 flex items-center gap-2 rounded-t-lg bg-[#141518] border-t border-l border-r border-white/10 group-hover:border-emerald-500/40 z-10 select-none transition-colors duration-200"
            >
                <span 
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: statusStyle.dot }}
                />
                <span className="font-mono font-bold uppercase text-[11px] tracking-wider text-text-primary">
                    0{index + 1} // {project.title}
                </span>
                {project.featured && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider ml-1">
                        FEATURED
                    </span>
                )}
            </div>

            {/* ── Dossier Card Body ── */}
            <div className="relative w-full flex-1 rounded-xl dossier-card p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Subtle top gloss line */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                {/* ── Top Header Row: Category & Status ── */}
                <div className="flex items-center justify-between w-full mb-5 z-10">
                    <div className="flex items-center gap-2">
                        <FolderGit2 size={15} className="text-emerald-400 shrink-0" />
                        <span className="font-mono text-[10px] md:text-[11px] text-white/60 tracking-widest uppercase">
                            FILE // 0{index + 1} &mdash; {project.type}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} font-mono text-[10px] font-semibold tracking-wider uppercase`}>
                            {project.status}
                        </span>
                        <span className="font-mono text-xs text-white/50">
                            {project.year}
                        </span>
                    </div>
                </div>

                {/* ── Middle: Content Layout (Varies by Card for Rich Bento Hierarchy) ── */}
                {index === 2 ? (
                    /* Panoramic 2-Column Dossier for GitCompass (col-span-12) */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-2 z-10">
                        {/* Left column: Title, Description, Telemetry */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                            <div>
                                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm md:text-[15px] text-text-secondary font-light leading-relaxed mt-2.5 max-w-2xl">
                                    {project.description}
                                </p>
                            </div>

                            {/* Telemetry Strip */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.06]">
                                    <div className="font-mono text-xs sm:text-sm font-bold text-text-primary">500</div>
                                    <div className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">Commits Sequenced</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.06]">
                                    <div className="font-mono text-xs sm:text-sm font-bold text-text-primary">2,000</div>
                                    <div className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">Code Hotspots</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-black/30 border border-white/[0.06]">
                                    <div className="font-mono text-xs sm:text-sm font-bold text-emerald-400">Gemini AI</div>
                                    <div className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-0.5">Arch Summaries</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column: Highlights console */}
                        <div className="lg:col-span-5 flex flex-col justify-center space-y-3 bg-black/25 rounded-lg p-4 border border-white/[0.06]">
                            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">// ARCHITECTURE TELEMETRY</span>
                                <span className="font-mono text-[9px] text-emerald-400">ANALYZER_SYS</span>
                            </div>
                            <ul className="space-y-2 font-mono text-xs text-text-secondary leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold select-none">&bull;</span>
                                    <span>Interactive repository history graphs via D3.js</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold select-none">&bull;</span>
                                    <span>FastAPI backend with strict memory limits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold select-none">&bull;</span>
                                    <span>Row-Level Security isolation via Supabase</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    /* Standard & Featured Dossier Cards (ConceptMap & Aurora'26) */
                    <div className="my-auto py-2 z-10 space-y-4">
                        <div>
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary tracking-tight group-hover:text-white transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-text-secondary font-light leading-relaxed mt-2.5">
                                {project.description}
                            </p>
                        </div>

                        {/* Telemetry pill row */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                            {index === 0 ? (
                                <>
                                    <span className="px-2.5 py-1 rounded bg-black/30 border border-white/[0.06] font-mono text-[10px] text-white/70">
                                        50+ Concept Nodes
                                    </span>
                                    <span className="px-2.5 py-1 rounded bg-black/30 border border-white/[0.06] font-mono text-[10px] text-white/70">
                                        4-Layer REST API
                                    </span>
                                    <span className="px-2.5 py-1 rounded bg-black/30 border border-white/[0.06] font-mono text-[10px] text-emerald-400/90">
                                        Virtualized Canvas
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="px-2.5 py-1 rounded bg-black/30 border border-white/[0.06] font-mono text-[10px] text-white/70">
                                        600+ Registrations
                                    </span>
                                    <span className="px-2.5 py-1 rounded bg-black/30 border border-white/[0.06] font-mono text-[10px] text-white/70">
                                        Team Lifecycle Management
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Bottom Row: Tech Stack & Actions ── */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-4 border-t border-white/[0.08] z-10">
                    {/* Tech stack pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        {project.stack.map((tech, i) => (
                            <span 
                                key={i}
                                className="px-2.5 py-1 rounded bg-black/40 border border-white/[0.08] font-mono text-[10px] text-white/75"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* CTAs & Direct Links */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Direct GitHub Link */}
                        {project.github && (
                            <button
                                type="button"
                                onClick={(e) => handleExternalLink(e, project.github)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                                aria-label={`View ${project.title} on GitHub`}
                            >
                                <FaGithub size={12} />
                                <span className="hidden sm:inline">Code</span>
                            </button>
                        )}

                        {/* Direct Live Demo Link */}
                        {project.link && (
                            <button
                                type="button"
                                onClick={(e) => handleExternalLink(e, project.link)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                                aria-label={`View live demo of ${project.title}`}
                            >
                                <ExternalLink size={12} />
                                <span className="hidden sm:inline">Live</span>
                            </button>
                        )}

                        {/* Open Dossier CTA */}
                        <span className="font-mono text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 transition-colors pl-1">
                            <span>OPEN DOSSIER</span>
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </div>
                </div>

                {/* Subtle Focus Ring */}
                {!disabled && (
                    <span
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 focus-visible:opacity-100 ring-2 ring-emerald-400"
                        aria-hidden="true"
                    />
                )}
            </div>
        </motion.div>
    );
};

export default FolderLayer;
