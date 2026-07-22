// FlipText.jsx
import Link from 'next/link';

const baseClass = "group relative inline-block overflow-hidden";

export default function FlipText({ href, children, className = '', ...props }) {
    const classes = `${baseClass} ${className}`.trim();

    const content = (
        <span className="relative z-10 block h-6 overflow-hidden leading-6">
            <span className="flex flex-col transition-transform duration-200 ease-linear group-hover:-translate-y-6">
                <span className="block h-6 whitespace-nowrap leading-6">{children}</span>
                <span className="block h-6 whitespace-nowrap leading-6">{children}</span>
            </span>
        </span>
    );

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <span className={classes} {...props}>
            {content}
        </span>
    );
}