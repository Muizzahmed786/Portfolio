import React, { useEffect, useRef, useState, useCallback } from 'react';

const VIDEO_SRC = '/video/animated-backgrounds-Image 1.mp4';

/**
 * ScrollVideoBackground
 *
 * Cinematic scroll-driven background video scrubber.
 * - Video is permanently paused and scrubs deterministically based on scroll position.
 * - 0% scroll -> 0% video, 50% scroll -> 50% video, 100% scroll -> 100% video.
 * - Reverse scrubbing when scrolling up.
 * - Frame freezes instantly when scrolling stops (no auto-playback or drift).
 * - Uses requestAnimationFrame with seek throttling and reactive on-scroll wake up for zero idle CPU.
 * - Fully respects prefers-reduced-motion.
 */
const ScrollVideoBackground = () => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Timing and seeking references
    const durationRef = useRef(0);
    const targetTimeRef = useRef(0);
    const currentTimeRef = useRef(0);
    const isSeekingRef = useRef(false);
    const pendingTimeRef = useRef(null);
    const rafIdRef = useRef(null);
    const isLoopRunningRef = useRef(false);

    // Calculate normalized scroll progress [0, 1]
    const getScrollProgress = useCallback(() => {
        const docEl = document.documentElement;
        const totalScrollable = docEl.scrollHeight - window.innerHeight;
        if (totalScrollable <= 0) return 0;
        const currentScroll = window.scrollY || window.pageYOffset || docEl.scrollTop || 0;
        return Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
    }, []);

    // Perform the actual seek operation with safety clamping and pending queue
    const seekTo = useCallback((time) => {
        const video = videoRef.current;
        const duration = durationRef.current;
        if (!video || !duration || isNaN(duration)) return;

        // Clamp safely to [0, duration - 0.03] to prevent hitting EOF freeze/black frame
        const safeTime = Math.max(0, Math.min(duration - 0.03, time));

        if (isSeekingRef.current) {
            // Buffer the latest desired timestamp while the decoder is busy
            pendingTimeRef.current = safeTime;
            return;
        }

        // Only seek if the difference is meaningful (> 2ms) to avoid redundant seeks
        if (Math.abs(video.currentTime - safeTime) > 0.002) {
            isSeekingRef.current = true;
            try {
                if (typeof video.fastSeek === 'function') {
                    video.fastSeek(safeTime);
                } else {
                    video.currentTime = safeTime;
                }
            } catch {
                video.currentTime = safeTime;
            }
        }
    }, []);

    // Animation frame tick: smoothly interpolates current frame towards target scroll timestamp
    const tick = useCallback(() => {
        const video = videoRef.current;
        const duration = durationRef.current;

        if (!video || duration <= 0) {
            isLoopRunningRef.current = false;
            return;
        }

        // If the browser cleared seeking state, acknowledge it
        if (!video.seeking && isSeekingRef.current && pendingTimeRef.current === null) {
            isSeekingRef.current = false;
        }

        const targetTime = targetTimeRef.current;
        const current = currentTimeRef.current;
        const diff = targetTime - current;

        // Responsive LERP (0.2 factor) gives an immediate, physically grounded feel
        // while smoothing out coarse mouse wheel tick steps
        if (Math.abs(diff) > 0.001) {
            currentTimeRef.current += diff * 0.22;
            seekTo(currentTimeRef.current);
            rafIdRef.current = requestAnimationFrame(tick);
        } else {
            // Settled on exact target frame
            currentTimeRef.current = targetTime;
            seekTo(targetTime);

            // If a seek is still finishing, keep one more loop alive until video.seeking clears
            if (isSeekingRef.current || pendingTimeRef.current !== null) {
                rafIdRef.current = requestAnimationFrame(tick);
            } else {
                // Sleep: 0 CPU usage while idle
                isLoopRunningRef.current = false;
            }
        }
    }, [seekTo]);

    // Wake the animation loop when scroll or resize occurs
    const wakeLoop = useCallback(() => {
        if (reducedMotion) return;

        const duration = durationRef.current;
        if (duration <= 0) return;

        const progress = getScrollProgress();
        targetTimeRef.current = progress * duration;

        if (!isLoopRunningRef.current) {
            isLoopRunningRef.current = true;
            rafIdRef.current = requestAnimationFrame(tick);
        }
    }, [getScrollProgress, reducedMotion, tick]);

    // Handle seeked event from the video element
    const handleSeeked = useCallback(() => {
        isSeekingRef.current = false;
        if (pendingTimeRef.current !== null) {
            const nextTime = pendingTimeRef.current;
            pendingTimeRef.current = null;
            seekTo(nextTime);
        }
    }, [seekTo]);

    // Check prefers-reduced-motion setting
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handleChange = (e) => {
            setReducedMotion(e.matches);
            if (e.matches && rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                isLoopRunningRef.current = false;
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    // Video metadata and initialization
    const handleLoadedMetadata = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force paused state
        video.pause();
        durationRef.current = video.duration || 0;
        setIsLoaded(true);

        // Position immediately to current scroll location on initial load or refresh
        const progress = getScrollProgress();
        const initialTime = progress * durationRef.current;
        targetTimeRef.current = initialTime;
        currentTimeRef.current = initialTime;
        seekTo(initialTime);
    }, [getScrollProgress, seekTo]);

    // Initial attachment and scroll listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();

        // Check if metadata was already loaded from cache
        if (video.readyState >= 1 && video.duration) {
            handleLoadedMetadata();
        }

        const onScroll = () => {
            wakeLoop();
        };

        const onResize = () => {
            wakeLoop();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [handleLoadedMetadata, wakeLoop]);

    return (
        <div
            className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden select-none bg-bg"
            aria-hidden="true"
        >
            {/* The scroll-scrubbed video */}
            <video
                ref={videoRef}
                src={VIDEO_SRC}
                playsInline
                muted
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                onLoadedMetadata={handleLoadedMetadata}
                onSeeked={handleSeeked}
                tabIndex={-1}
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Subtle soft tint overlay for contrast while preserving video vibrancy */}
            <div className="absolute inset-0 bg-[#11100E]/30 pointer-events-none" />

            {/* Top & bottom subtle gradient fades for seamless navbar and footer blending */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#11100E]/90 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#11100E]/90 to-transparent pointer-events-none" />
        </div>
    );
};

export default ScrollVideoBackground;
