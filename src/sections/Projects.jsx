import React, { useState, useEffect, useCallback, useRef } from 'react';
import TabStrip from '../components/projects/TabStrip.jsx';
import ProjectDetail from '../components/projects/ProjectDetail.jsx';
import { projects } from '../data/portfolio.js';

const Projects = () => {
    // ── State machine ──────────────────────────────────────────────────────────
    // 'idle' | 'opening' | 'detail' | 'switching' | 'closing'
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
        if (state === 'idle') {
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
            if (e.key === 'Escape' && (stateRef.current === 'detail' || stateRef.current === 'switching')) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setState('switching');
    }, []);

    const handleClose = useCallback(() => {
        if (stateRef.current !== 'detail') return;
        setState('closing');
    }, []);

    // This callback is stable and uses the ref to read nextProjectId at call time,
    // avoiding stale closure problems when the child calls it after a wipe completes.
    const handleStateChange = useCallback((newState) => {
        setState(newState);

        if (newState === 'idle') {
            setTimeout(() => {
                setActiveProjectId(null);
                setStartRect(null);
                setNextProjectId(null);
            }, 50);
        } else if (newState === 'detail') {
            // After a wipe: promote nextProject to active using the ref (not stale closure)
            const currentNext = nextProjectIdRef.current;
            if (currentNext) {
                setActiveProjectId(currentNext);
                setNextProjectId(null);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally stable — reads live values via refs

    // ── Derived ────────────────────────────────────────────────────────────────
    const activeProject = projects.find(p => p.id === activeProjectId) ?? null;
    const nextProject   = projects.find(p => p.id === nextProjectId)   ?? null;

    return (
        <>
            <TabStrip
                onTabClick={handleTabClick}
                isLocked={state !== 'idle'}
            />

            {state !== 'idle' && activeProject && (
                <ProjectDetail
                    project={activeProject}
                    nextProject={nextProject}
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
