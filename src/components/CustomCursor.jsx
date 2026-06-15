import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
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
    let hasMoved = false;

    const onMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = '1';
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    };

    const onMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .project-card, input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    const onMouseLeave = () => {
      hasMoved = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onMouseEnter = (e) => {
      hasMoved = true;
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let rafId;

    const tick = () => {
      if (hasMoved) {
        if (dotRef.current) {
          // Align horizontal center (half of 44px is 22) and vertical top (ear tip starts 1px from top border of viewBox)
          dotRef.current.style.transform = `translate3d(${cursor.x - 22}px, ${cursor.y - 1}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center text-[#00d8ff] transition-[opacity,filter] duration-300 ease-out opacity-0"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        width: '44px',
        height: '12px',
        filter: isHovering 
          ? 'drop-shadow(0 0 6px rgba(0, 216, 255, 0.9)) drop-shadow(0 0 15px rgba(0, 216, 255, 0.5))' 
          : 'drop-shadow(0 0 2px rgba(0, 216, 255, 0.6))'
      }}
    >
      <svg
        viewBox="5 6 110 30"
        className={`w-full h-full fill-current transition-transform duration-300 ease-out ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
      >
        <path d="M 60,10 L 62,6 L 66,9 L 115,17 L 105,25 L 95,23 L 85,27 L 75,24 L 68,28 L 64,25 L 60,36 L 56,25 L 52,28 L 45,24 L 35,27 L 25,23 L 15,25 L 5,17 L 54,9 L 58,6 Z" />
      </svg>
    </div>
  );
};

export default CustomCursor;
