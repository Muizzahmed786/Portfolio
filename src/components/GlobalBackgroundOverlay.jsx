import React from 'react';

/**
 * GlobalBackgroundOverlay
 * 
 * Unified global readability overlay positioned between the background video
 * and all content layers. Provides a consistent dark translucent scrim, radial
 * vignette, and subtle edge gradients so that text and UI panels remain sharp
 * and legible across all video frames without section-level darkening hacks.
 */
const GlobalBackgroundOverlay = () => {
    return (
        <div
            className="fixed inset-0 -z-20 w-full h-full pointer-events-none select-none"
            aria-hidden="true"
        >
            {/* Global dark translucent scrim */}
            <div className="absolute inset-0 bg-[#0C0B09]/72" />

            {/* Subtle radial vignette to soften edges and center focus */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,12,0.55)_100%)]" />

            {/* Seamless gradient blend at top (under navbar) and bottom (footer) */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C0B09]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0B09]/90 to-transparent" />
        </div>
    );
};

export default GlobalBackgroundOverlay;
