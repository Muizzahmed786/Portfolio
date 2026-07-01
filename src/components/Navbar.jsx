import React from "react";

const navItems = [
    {label: "About", id: "about"},
    {label: "Education", id: "education"}, 
    {label: "Skills", id: "skills"}, 
    {label: "Projects", id:"projects"}, 
    {label: "Contact", id: "contact"}
];

const Navbar = () => {
    const scrollFunction = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
            console.warn(`Element with id "${sectionId}" not found.`);
            return;
        }
        element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 border-b border-border bg-bg/85 backdrop-blur-md z-50 py-4">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <span 
                        className="font-mono text-sm font-semibold tracking-wider text-text-primary cursor-pointer hover:text-accent transition-colors"
                        onClick={() => scrollFunction("about")}
                    >
                        // muizz.dev
                    </span>
                </div>

                <ul className="hidden md:flex gap-6 lg:gap-8">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button 
                                type="button"
                                onClick={() => scrollFunction(item.id)}
                                className="nav-link font-display text-xs font-medium tracking-wide cursor-pointer"
                            >
                                {item.label.toLowerCase()}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1.5 px-3 py-1 border border-border text-text-secondary font-mono text-[10px] tracking-wider uppercase bg-surface rounded-[4px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    <span>online</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;