// ButtonC.jsx
import Link from 'next/link';

const baseClass =
    "button group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-4 py-1 md:py-2 text-foreground active:scale-97 text-xs sm:text-sm md:text-base";

export default function ButtonC({ href, children = 'Get Started', className = '', ...props }) {
    const classes = `${baseClass} ${className}`.trim();

    const content = (
        <>
            <span className="absolute left-0 top-full h-full w-full rounded-full bg-accent transition-transform duration-300 group-hover:-translate-y-full" />
            <span className="relative z-10 whitespace-nowrap leading-6   text-black">{children}</span>
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