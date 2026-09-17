import type { Config } from "tailwindcss";

/**
 * Breakpoints for media queries:
 * 320px, 768px, and 1024px
 */

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: "320px",
            md: "768px",
            lg: "1024px",
            xl: "1080px", // For fun ✨
        },
        extend: {
            fontFamily: {
                striking: ["var(--striking-font)"],
                simple: ["var(--simple-font)"],
                mono: [
                    "var(--mono-font)",
                    "ui-monospace",
                    "monospace",
                ],
            },
            colors: {
                orange: {
                    // Near-black warm base; kept dark for max contrast with amber accents
                    "975": "#0A0401",
                },
            },
            spacing: {
                "nav-margin": "4.5rem",
            },
        },
    },
    plugins: [],
};

export default config;
