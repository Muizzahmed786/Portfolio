import React from "react";
import { personal } from "../data/portfolio.js";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer id="footer" className="border-t border-border bg-bg py-8 mt-5">
            <div className="max-w-275 mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-mono text-xs text-text-secondary">
                    © {currentYear} {personal.name}. All rights reserved.
                </div>
                <div className="font-mono text-[10px] text-text-muted select-none uppercase tracking-wider">
                    Built with React & Tailwind
                </div>
            </div>
        </footer>
    );
};

export default Footer;