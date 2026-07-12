import Link from 'next/link';

export default function GetStartedButton({
                                             href = '/',
                                             children = 'Get Started',
                                         }) {
    return (
        <Link
            href={href}
            className="
        group relative inline-flex items-center justify-center overflow-hidden
        rounded-full bg-lime-400 px-4 py-2 text-base text-foreground
      "
        >
      <span
          className="
          absolute left-1/2 top-full h-full w-full
          -translate-x-1/2 rounded-full bg-white
          transition-transform duration-300 ease-linear
          group-hover:-translate-y-full
        "
      />

            <span className="relative z-10 block h-6 overflow-hidden leading-6">
        <span
            className="
            flex flex-col
            transition-transform duration-300 ease-linear
            group-hover:-translate-y-6
          "
        >
          <span className="block h-6 whitespace-nowrap leading-6">
            {children}
          </span>

          <span className="block h-6 whitespace-nowrap leading-6">
            {children}
          </span>
        </span>
      </span>
        </Link>
    );
}