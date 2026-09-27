import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
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
