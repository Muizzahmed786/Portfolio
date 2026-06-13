import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Detect if device supports touch input
    const checkTouch = () => {
      const touch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(touch);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (window.matchMedia('(pointer: coarse)').matches) {
      return () => {
        window.removeEventListener('resize', checkTouch);
      };
    }

    // Set custom-cursor-active class to hide the default browser cursor
    document.body.classList.add('custom-cursor-active');

    const cursor = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursor.x - 3}px, ${cursor.y - 3}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .project-card, input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    let rafId;
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const tick = () => {
      ring.x = lerp(ring.x, cursor.x, 0.18);
      ring.y = lerp(ring.y, cursor.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 14}px, ${ring.y - 14}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-7 w-7 rounded-full border border-accent mix-blend-difference transition-all duration-300 ease-out ${
          isHovering ? 'scale-150 bg-accent/10' : ''
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};

export default CustomCursor;
