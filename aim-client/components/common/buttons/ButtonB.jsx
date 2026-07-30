// WatchDemoButton.jsx
import Link from 'next/link';

const baseClass =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#222222] px-4 py-2 text-white transition-colors duration-300 active:scale-97";

export default function WatchDemoButton({ href, children = 'Watch Demo', className = '', ...props }) {
    const classes = `${baseClass} ${className}`.trim();

    const content = (
        <>
            <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-tertiary transition-transform duration-300 ease-linear group-hover:scale-x-100" />
            <span className="relative z-10 flex items-center gap-5 font-anonymous font-semibold text-white">{children}</span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {content}
        </button>
    );
}