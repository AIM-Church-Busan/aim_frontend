import Link from 'next/link';

export default function WatchDemoButton({
                                            href = '/',
                                            children = 'Watch Demo',
                                            className = '',
                                        }) {
    return (
        <Link
            href={href}
            className={`
        group relative inline-flex items-center justify-center
        overflow-hidden rounded-full bg-foreground px-4 py-2
        text-white transition-colors duration-300
        ${className}
      `}
        >
      <span
          className="
          absolute inset-y-0 left-0 w-full origin-left
          scale-x-0 bg-tertiary
          transition-transform duration-300 ease-linear
          group-hover:scale-x-100
        "
      />

            <span className="relative z-10 flex items-center gap-5">
                {children}
      </span>
        </Link>
    );
}