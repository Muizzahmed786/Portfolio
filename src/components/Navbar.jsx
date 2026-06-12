import React from "react";

const navItems = [
    {label: "About Me", id: "about"},
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
        // Fixed: element is an object, so template literals print [object HTMLDivElement]. 
        // Logging it separately lets you inspect the actual DOM node.
        console.log(`Scrolled to:`, element);
    };

    return (
        <nav className="flex fixed top-5 left-1/2 -translate-x-1/2 items-center gap-12 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 z-50">
            <div className="text-white">
                MA
            </div>

            <ul className="flex gap-16">
                {navItems.map((item) => (
                    <li key={item.id} className="text-yellow-400">
                        <button 
                            type="button"
                            onClick={() => scrollFunction(item.id)}
                            className="cursor-pointer hover:text-yellow-200 transition-colors"
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="text-white">
                toggle
            </div>
        </nav>
    );
};

export default Navbar;