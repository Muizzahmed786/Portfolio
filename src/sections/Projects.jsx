import React, { useState, useEffect, useCallback, useRef } from 'react';
import TabStrip from '../components/projects/TabStrip.jsx';
import ProjectDetail from '../components/projects/ProjectDetail.jsx';
import { projects } from '../data/portfolio.js';

const Projects = () => {
    // ── State machine ──────────────────────────────────────────────────────────
    // 'idle' | 'opening' | 'detail' | 'closing' | 'switching-out' | 'archive-transition'
    const [state, setState]               = useState('idle');
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [nextProjectId, setNextProjectId]     = useState(null);
    const [startRect, setStartRect]             = useState(null);

    // Use refs for values that are read inside callbacks that shouldn't be recreated
    const nextProjectIdRef = useRef(null);
    const stateRef         = useRef('idle');

    // Keep refs in sync
    useEffect(() => { nextProjectIdRef.current = nextProjectId; }, [nextProjectId]);
    useEffect(() => { stateRef.current = state; }, [state]);

    // ── Scrollbar-width-aware body scroll lock ─────────────────────────────────
    useEffect(() => {
        if (state === 'idle' || state === 'archive-transition') {
            document.body.style.overflow     = '';
            document.body.style.paddingRight = '';
            return;
        }

        // Measure scrollbar width before locking to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow     = 'hidden';
        document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '';

        return () => {
            document.body.style.overflow     = '';
            document.body.style.paddingRight = '';
        };
    }, [state]);

    // ── Keyboard: Escape closes ────────────────────────────────────────────────
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && stateRef.current === 'detail') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Archive Transition Automation ──────────────────────────────────────────
    useEffect(() => {
        if (state === 'archive-transition') {
            const timer = setTimeout(() => {
                const nextId = nextProjectIdRef.current;
                if (!nextId) return;

                const el = document.querySelector(`[data-tab-id="${nextId}"]`);
                let rect = null;
                if (el) rect = el.getBoundingClientRect();
                
                setActiveProjectId(nextId);
                setStartRect(rect);
                setNextProjectId(null);
                setState('opening');
            }, 150); // Reduced delay so archive is briefly recognized but doesn't feel sluggish
            return () => clearTimeout(timer);
        }
    }, [state]);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleTabClick = useCallback((projectId, rect) => {
        // Ignore clicks during any active transition
        if (stateRef.current !== 'idle') return;
        setActiveProjectId(projectId);
        setStartRect(rect);
        setState('opening');
    }, []);

    const handleRailClick = useCallback((projectId) => {
        // Only switch if fully settled in detail view
        if (stateRef.current !== 'detail') return;
        setNextProjectId(projectId);
        setState('switching-out');
    }, []);

    const handleClose = useCallback(() => {
        if (stateRef.current !== 'detail') return;
        setState('closing');
    }, []);

    const handleStateChange = useCallback((newState) => {
        setState(newState);

        if (newState === 'idle') {
            setTimeout(() => {
                setActiveProjectId(null);
                setStartRect(null);
                setNextProjectId(null);
            }, 50);
        }
    }, []);

    // ── Derived ────────────────────────────────────────────────────────────────
    const activeProject = projects.find(p => p.id === activeProjectId) ?? null;
    
    // ProjectDetail is mounted if we are not idle, and not in the middle of a pure archive transition where we want nothing covering the tabs
    // Wait, during 'archive-transition', if ProjectDetail unmounts, the tab is already opacity:1 so there's no gap.
    // If we unmount it, the DOM is cleaner. Let's unmount during archive-transition.
    const isProjectDetailMounted = state !== 'idle' && state !== 'archive-transition' && activeProject;

    return (
        <>
            <TabStrip
                onTabClick={handleTabClick}
                isLocked={state !== 'idle' && state !== 'archive-transition'}
                activeProjectId={activeProjectId}
                state={state}
            />

            {isProjectDetailMounted && (
                <ProjectDetail
                    project={activeProject}
                    state={state}
                    startRect={startRect}
                    onStateChange={handleStateChange}
                    onClose={handleClose}
                    onRailClick={handleRailClick}
                />
            )}
        </>
    );
};

export default Projects;
