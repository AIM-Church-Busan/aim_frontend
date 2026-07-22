// GetStartedButton.jsx
import Link from 'next/link';

const baseClass =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-4 py-2 text-foreground";

export default function GetStartedButton({ href, children = 'Get Started', className = '', ...props }) {
    const classes = `${baseClass} ${className}`.trim();

    const content = (
        <>
            <span className="absolute left-1/2 top-full h-full w-full -translate-x-1/2 rounded-full bg-white transition-transform duration-300 ease-linear group-hover:-translate-y-full" />
            <span className="relative z-10 block h-6 overflow-hidden leading-6">
                <span className="flex flex-col transition-transform duration-300 ease-linear group-hover:-translate-y-6">
                    <span className="block h-6 whitespace-nowrap leading-6 font-anonymous font-semibold text-black">{children}</span>
                    <span className="block h-6 whitespace-nowrap leading-6 font-anonymous font-semibold text-black">{children}</span>
                </span>
            </span>
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