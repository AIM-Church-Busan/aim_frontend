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
            },
        }
    },
    darkMode: "media"
};
