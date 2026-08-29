import React, { useEffect, useRef } from 'react';

const AnimatedDotField = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let dots = [];
        let width, height;
        let isMobile = false;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            isMobile = width < 768;
            
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            
            initDots();
        };

        const initDots = () => {
            dots = [];
            
            let dotSpacing = 30; // Desktop
            if (width < 1024) dotSpacing = 34; // Tablet
            if (width < 768) dotSpacing = 40; // Mobile

            const cols = Math.floor(width / dotSpacing) + 2;
            const rows = Math.floor(height / dotSpacing) + 2;
            
            const offsetX = (width - (cols - 1) * dotSpacing) / 2;
            const offsetY = (height - (rows - 1) * dotSpacing) / 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        baseX: offsetX + i * dotSpacing,
                        baseY: offsetY + j * dotSpacing,
                        x: offsetX + i * dotSpacing,
                        y: offsetY + j * dotSpacing,
                    });
                }
            }
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            const dotRadius = 1;
            const INTERACTION_RADIUS = 140;
            const MAX_REPULSION = 10;

            dots.forEach(dot => {
                let targetX = dot.baseX;
                let targetY = dot.baseY;
                let opacity = 0.45; // Base opacity

                if (!prefersReducedMotion) {
                    // Mathematical Field Deformation
                    // Frequencies
                    const f1 = 0.002;
                    const f2 = 0.003;
                    const f3 = 0.0015;
                    
                    // Speeds
                    const s1 = 0.0001;
                    const s2 = 0.00015;
                    const s3 = 0.00008;

                    // Waves
                    const wave1 = Math.sin(dot.baseX * f1 + time * s1);
                    const wave2 = Math.cos(dot.baseY * f2 + time * s2);
                    const wave3 = Math.sin((dot.baseX + dot.baseY) * f3 + time * s3);

                    // Amplitudes
                    const a1 = 3;
                    const a2 = 4;
                    const a3 = 3;

                    targetX += wave1 * a1 + wave2 * a2;
                    targetY += wave2 * a2 + wave3 * a3;

                    // Calculate density based on wave convergence to modify opacity
                    // When waves align, density increases locally
                    const density = (wave1 + wave2 + wave3) / 3; // range roughly -1 to 1
                    opacity = 0.45 + (density * 0.15); // fluctuates between 0.30 and 0.60

                    // Cursor Interaction
                    if (!isMobile && mouseX > -1000 && mouseY > -1000) {
                        const dx = targetX - mouseX;
                        const dy = targetY - mouseY;
                        const distance = Math.hypot(dx, dy);

                        if (distance < INTERACTION_RADIUS) {
                            let influence = 1 - distance / INTERACTION_RADIUS;
                            influence = influence * influence; // Smooth falloff
                            
                            const dist = Math.max(distance, 1);
                            
                            const repulsionX = (dx / dist) * influence * MAX_REPULSION;
                            const repulsionY = (dy / dist) * influence * MAX_REPULSION;
                            
                            targetX += repulsionX;
                            targetY += repulsionY;
                        }
                    }
                }

                // Smooth Interpolation
                dot.x += (targetX - dot.x) * 0.08;
                dot.y += (targetY - dot.y) * 0.08;

                // Draw
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(242, 240, 232, ${opacity})`;
                ctx.fill();
            });

            if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        window.addEventListener('resize', resize);
        
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        resize();
        
        if (prefersReducedMotion) {
            draw(0);
        } else {
            animationFrameId = requestAnimationFrame(draw);
        }

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ display: 'block' }}
            aria-hidden="true"
        />
    );
};

export default AnimatedDotField;
