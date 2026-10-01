import React, { useRef, useState, useEffect } from 'react';

const VIDEO_SRC = '/video/animated-backgrounds-Image 1.mp4';

/**
 * GlobalBackgroundVideo
 * 
 * Single global fixed background video that continuously plays across the entire
 * portfolio. Never restarts, never crops differently between sections, and remains
 * permanently pinned as the foundational canvas behind all content.
 */
const GlobalBackgroundVideo = () => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Ensure auto-playback is reliably engaged
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay policy fallback: muted video is guaranteed
                video.muted = true;
                video.play().catch(() => {});
            });
        }
    }, []);

    return (
        <div
            className="fixed inset-0 -z-30 w-full h-full pointer-events-none overflow-hidden select-none bg-[#0B0A08]"
            aria-hidden="true"
        >
            <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                tabIndex={-1}
                onLoadedData={() => setIsLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />
        </div>
    );
};

export default GlobalBackgroundVideo;
