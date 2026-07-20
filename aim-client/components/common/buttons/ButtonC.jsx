import Link from 'next/link';

export default function ButtonC({ href = '/', children = 'Get Started' }) {
    return (
        <Link
            href={href}
            className="
        group relative inline-flex items-center justify-center overflow-hidden
        rounded-full bg-white px-4 py-2 text-foreground
      "
        >
      <span
          className="
          absolute left-0 top-full h-full w-full
          rounded-full bg-lime-400
          transition-transform duration-300
          group-hover:-translate-y-full
        "
      />

            <span className="relative z-10 whitespace-nowrap leading-6">
        {children}
      </span>
        </Link>
    );
}