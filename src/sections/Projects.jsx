import React, { useState, useEffect } from 'react';
import TabStrip from '../components/projects/TabStrip.jsx';
import ProjectDetail from '../components/projects/ProjectDetail.jsx';
import { projects } from '../data/portfolio.js';

const Projects = () => {
    // State Machine: 'idle' | 'opening' | 'detail' | 'switching' | 'closing'
    const [state, setState] = useState('idle');
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [nextProjectId, setNextProjectId] = useState(null);
    const [startRect, setStartRect] = useState(null);

    // Lock body scroll when not idle
    useEffect(() => {
        if (state !== 'idle') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [state]);

    const handleTabClick = (projectId, rect) => {
        setActiveProjectId(projectId);
        setStartRect(rect);
        setState('opening');
    };

    const handleRailClick = (projectId) => {
        if (state === 'detail' || state === 'switching') {
            setNextProjectId(projectId);
            setState('switching');
        }
    };

    const handleClose = () => {
        setState('closing');
    };

    const handleStateChange = (newState) => {
        setState(newState);
        if (newState === 'idle') {
            setActiveProjectId(null);
            setStartRect(null);
        } else if (newState === 'detail' && nextProjectId) {
            setActiveProjectId(nextProjectId);
            setNextProjectId(null);
        }
    };

    const activeProject = projects.find(p => p.id === activeProjectId);
    const nextProject = projects.find(p => p.id === nextProjectId);

    return (
        <>
            {/* Always render TabStrip underneath so it's there when we close */}
            <TabStrip onTabClick={handleTabClick} />
            
            {/* Render ProjectDetail overlay when not idle */}
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
