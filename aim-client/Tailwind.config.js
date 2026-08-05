module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [require("@relume_io/relume-tailwind")],
    theme: {
        extend: {
            fontFamily: {
                anonymous: ['var(--font-anonymous-pro)', 'monospace'],
                vietnam: ['var(--font-be-vietnam-pro)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                google: ['var(--font-google-sans)', 'sans-serif'],
                germania: ['var(--font-germania-one)', 'sans-serif'],
                figtree: ['var(--font-fig-tree)', 'sans-serif'],
                dongle: ['var(--font-dongle)', 'sans-serif'],
            },
        }
    },
    darkMode: "media"
};
