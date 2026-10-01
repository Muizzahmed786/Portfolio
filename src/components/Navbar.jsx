import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";

const navItems = [
    { label: "About", id: "about", index: "01" },
    { label: "Education", id: "education", index: "02" }, 
    { label: "Skills", id: "skills", index: "03" }, 
    { label: "Projects", id: "projects", index: "04" }, 
    { label: "Contact", id: "contact", index: "05" }
];

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("about");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Robust scroll-spy for consistent active section tracking
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // If scrolled to bottom of document, activate Contact
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
            if (isBottom) {
                setActiveSection("contact");
                return;
            }

            // Standard scroll offset detection (navbar height + 60px lookahead)
            const scrollPosition = window.scrollY + 130;
            for (let i = navItems.length - 1; i >= 0; i--) {
                const section = document.getElementById(navItems[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (!element) return;
        element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[#0C0B09]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3.5"
                    : "bg-[#0C0B09]/45 backdrop-blur-md border-b border-white/[0.04] py-4 md:py-5"
            }`}
        >
            <div className="content-container flex justify-between items-center w-full">
                
                {/* Brand / Terminal Glyph */}
                <button
                    type="button"
                    onClick={() => scrollToSection("about")}
                    className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
                    aria-label="Muizz Ahmed - Return to top"
                >
                    <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:bg-accent/[0.08] transition-all duration-300">
                        <Terminal size={15} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-text-primary group-hover:text-accent transition-colors">
                            muizz.dev
                        </span>
                        <span className="font-mono text-[9px] text-text-muted tracking-widest hidden sm:inline">
                            SYS // ARCHITECTURE
                        </span>
                    </div>
                </button>

                {/* Desktop Navigation Links — Uniform Active State */}
                <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm" aria-label="Main Navigation">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? "text-accent font-semibold bg-accent/[0.08] border border-accent/25 shadow-[0_0_12px_rgba(245,197,24,0.1)]"
                                        : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04] border border-transparent"
                                }`}
                            >
                                <span className={`text-[10px] mr-1.5 font-mono ${isActive ? "text-accent font-bold" : "text-accent/60"}`}>
                                    {item.index}.
                                </span>
                                {item.label}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full shadow-[0_0_6px_var(--color-accent)]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Status Indicator & Quick Contact CTA */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.06] border border-accent/25 text-text-primary font-mono text-[11px] tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="uppercase text-[10px] font-semibold text-accent">AVAILABLE FOR WORK</span>
                    </div>

                    <a
                        href="/muizz-resume-1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-accent/10 border border-white/[0.08] hover:border-accent/40 text-text-secondary hover:text-accent font-mono text-[11px] tracking-wide transition-all duration-200"
                    >
                        <span>RESUME</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-md bg-white/[0.04] border border-white/[0.08] text-text-primary hover:text-accent transition-colors cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden px-6 pt-4 pb-6 bg-[#0C0B09]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl animate-fadeUp">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-mono text-sm tracking-wider text-left transition-all cursor-pointer ${
                                        isActive
                                            ? "bg-accent/[0.1] text-accent font-semibold border border-accent/30"
                                            : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    <span className="text-xs text-accent font-mono">// {item.index}</span>
                                </button>
                            );
                        })}
                        <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                            <span className="flex items-center gap-2 font-mono text-[11px] text-accent">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                AVAILABLE FOR HIRE
                            </span>
                            <a
                                href="/muizz-resume-1.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-xs text-text-primary hover:text-accent"
                            >
                                RESUME <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;