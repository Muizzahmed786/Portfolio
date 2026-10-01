import React from "react";
import { ArrowUp, Terminal } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer id="footer" className="relative z-10 border-t border-white/[0.08] bg-transparent py-10 mt-6">
            <div className="content-container flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Brand & Status */}
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent">
                        <Terminal size={13} />
                    </div>
                    <div>
                        <span className="font-mono text-xs font-bold text-text-primary block">
                            muizz.dev
                        </span>
                        <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
                            &copy; {currentYear} Muizz Ahmed &bull; All Rights Reserved
                        </span>
                    </div>
                </div>

                {/* System Tech Stack Tag */}
                <div className="font-mono text-[11px] text-text-muted select-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Engineered with React 19 &bull; Tailwind CSS &bull; Vite</span>
                </div>

                {/* Back to top button */}
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-accent/[0.1] border border-white/[0.08] hover:border-accent/40 text-text-secondary hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    aria-label="Back to top"
                >
                    <span>TOP</span>
                    <ArrowUp size={13} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;