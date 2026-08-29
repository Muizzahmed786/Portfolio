import React, { useEffect, useRef } from 'react';

const PixelField = ({ className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        let time = 0;

        // Interaction states
        let mouseX = -1000;
        let mouseY = -1000;
        let isTouchDevice = false;

        let activeBentoRect = null;
        let bentoInteractionType = 'none'; // 'hover', 'click', 'none'
        let bentoInteractionTime = 0;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Configuration
        const getGridSpacing = () => {
            if (width < 768) return 56; // Mobile
            if (width < 1024) return 48; // Tablet
            return 36; // Desktop
        };

        const initParticles = () => {
            particles = [];
            const spacing = getGridSpacing();
            const cols = Math.ceil(width / spacing) + 2;
            const rows = Math.ceil(height / spacing) + 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const baseX = (i - 1) * spacing + (Math.random() - 0.5) * spacing * 0.5;
                    const baseY = (j - 1) * spacing + (Math.random() - 0.5) * spacing * 0.5;
                    
                    const rand = Math.random();
                    let colorType = 'normal'; // 92%
                    let opacity = 0.2 + Math.random() * 0.2; // 0.20 - 0.40
                    
                    if (rand > 0.92) {
                        colorType = 'bright'; // ~8%
                        opacity = 0.4 + Math.random() * 0.15; // 0.40 - 0.55
                    }

                    particles.push({
                        baseX,
                        baseY,
                        x: baseX,
                        y: baseY,
                        vx: 0,
                        vy: 0,
                        opacity,
                        size: Math.random() > 0.5 ? 1.5 : 2,
                        type: colorType,
                        phase: 'idle',
                        phaseTime: 0,
                        targetX: baseX,
                        targetY: baseY,
                    });
                }
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Support high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            initParticles();
        };

        window.addEventListener('resize', resize);
        resize();

        // Mouse tracking
        const handleMouseMove = (e) => {
            if (isTouchDevice) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleTouchStart = () => { isTouchDevice = true; };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouchStart, { once: true });

        // Bento Interaction Handlers
        const handleBentoHover = (e) => {
            if (isTouchDevice || prefersReducedMotion) return;
            activeBentoRect = e.detail.rect;
            bentoInteractionType = 'hover';
            bentoInteractionTime = 0;
        };
        const handleBentoLeave = () => {
            if (bentoInteractionType === 'hover') {
                // Don't reset rect immediately so the return animation finishes around the same area
                bentoInteractionType = 'none';
            }
        };
        const handleBentoClick = (e) => {
            if (prefersReducedMotion) return;
            activeBentoRect = e.detail.rect;
            bentoInteractionType = 'click';
            bentoInteractionTime = 0;
        };

        window.addEventListener('bento-hover', handleBentoHover);
        window.addEventListener('bento-leave', handleBentoLeave);
        window.addEventListener('bento-click', handleBentoClick);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.005;
            if (bentoInteractionType !== 'none') {
                bentoInteractionTime += 0.016; // approx 1 frame
            }

            let lastType = '';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (!prefersReducedMotion) {
                    // 1. Base Deformation (Slow math noise)
                    // Quieter around the Hero (top center approx)
                    let noiseScale = 1.0;
                    if (p.baseY < 500 && p.baseX > width / 2 - 400 && p.baseX < width / 2 + 400) {
                        noiseScale = 0.3; // Much quieter near Hero
                    }

                    const noiseX = (Math.sin(p.baseY * 0.01 + time) * 2.5 + Math.cos((p.baseX + p.baseY) * 0.005 - time) * 1.5) * noiseScale;
                    const noiseY = (Math.cos(p.baseX * 0.01 - time) * 2.5 + Math.sin((p.baseX - p.baseY) * 0.005 + time) * 1.5) * noiseScale;
                    
                    let targetX = p.baseX + noiseX;
                    let targetY = p.baseY + noiseY;

                    // 2. Cursor Disturbance (subtle repulsion)
                    if (!isTouchDevice) {
                        const dx = targetX - mouseX;
                        const dy = targetY - mouseY;
                        const distSq = dx * dx + dy * dy;
                        const maxDist = 140;
                        if (distSq < maxDist * maxDist && distSq > 0) {
                            const dist = Math.sqrt(distSq);
                            const force = (maxDist - dist) / maxDist;
                            // Push away gently (max 6px)
                            targetX += (dx / dist) * force * 6;
                            targetY += (dy / dist) * force * 6;
                        }
                    }

                    // 3. Bento Interaction Disturbance
                    if (activeBentoRect && bentoInteractionType !== 'none') {
                        const rect = activeBentoRect;
                        const margin = 120; // Interaction zone around the card
                        
                        // Check if particle is near the perimeter but NOT inside the card
                        const inOuterBound = 
                            p.baseX > rect.left - margin && p.baseX < rect.right + margin &&
                            p.baseY > rect.top - margin && p.baseY < rect.bottom + margin;
                            
                        const inInnerBound = 
                            p.baseX > rect.left + 15 && p.baseX < rect.right - 15 &&
                            p.baseY > rect.top + 15 && p.baseY < rect.bottom - 15;

                        if (inOuterBound && !inInnerBound) {
                            // Find closest point on rectangle edge
                            const clampedX = Math.max(rect.left, Math.min(p.baseX, rect.right));
                            const clampedY = Math.max(rect.top, Math.min(p.baseY, rect.bottom));
                            
                            const dRectX = p.baseX - clampedX;
                            const dRectY = p.baseY - clampedY;
                            const distToRect = Math.sqrt(dRectX * dRectX + dRectY * dRectY) || 1;
                            const dirX = dRectX / distToRect;
                            const dirY = dRectY / distToRect;

                            if (bentoInteractionType === 'hover') {
                                // Phase 1: Subtle attraction (0-150ms), Phase 2: Gentle Burst, Phase 3: Dissipate
                                if (bentoInteractionTime < 0.15) {
                                    // Attract towards edge
                                    const force = Math.sin(bentoInteractionTime * Math.PI / 0.15);
                                    targetX -= dirX * force * 2; // Almost imperceptible
                                    targetY -= dirY * force * 2;
                                } else if (bentoInteractionTime < 0.4) {
                                    // Burst outwards gently
                                    const burstT = (bentoInteractionTime - 0.15) / 0.25;
                                    const force = Math.sin(burstT * Math.PI) * 4; // Gentle push
                                    const scatterX = (Math.random() - 0.5) * 2;
                                    const scatterY = (Math.random() - 0.5) * 2;
                                    targetX += dirX * force + scatterX;
                                    targetY += dirY * force + scatterY;
                                }
                                // after 0.4s, return to normal smoothly is handled by the overall interpolation
                            } else if (bentoInteractionType === 'click') {
                                // Click: stronger blast
                                if (bentoInteractionTime < 0.1) {
                                    // Quick suck in
                                    targetX -= dirX * 6;
                                    targetY -= dirY * 6;
                                } else if (bentoInteractionTime < 0.4) {
                                    const burstT = (bentoInteractionTime - 0.1) / 0.3;
                                    const force = Math.sin(burstT * Math.PI) * 12; // Stronger outward
                                    const scatterX = (Math.random() - 0.5) * 4;
                                    const scatterY = (Math.random() - 0.5) * 4;
                                    targetX += dirX * force + scatterX;
                                    targetY += dirY * force + scatterY;
                                }
                                if (bentoInteractionTime > 0.5) {
                                    bentoInteractionType = 'none';
                                }
                            }
                        }
                    }

                    // Smooth interpolation to target
                    p.x += (targetX - p.x) * 0.1;
                    p.y += (targetY - p.y) * 0.1;
                }

                // Render
                let fillStyle;
                if (p.type === 'bright') {
                    fillStyle = `rgba(242, 240, 232, ${p.opacity})`;
                } else {
                    fillStyle = `rgba(242, 240, 232, ${p.opacity})`;
                }

                if (fillStyle !== lastType) {
                    ctx.fillStyle = fillStyle;
                    lastType = fillStyle;
                }

                ctx.fillRect(p.x, p.y, p.size, p.size);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('bento-hover', handleBentoHover);
            window.removeEventListener('bento-leave', handleBentoLeave);
            window.removeEventListener('bento-click', handleBentoClick);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none ${className || ''}`}
            aria-hidden="true"
        />
    );
};

export default PixelField;
