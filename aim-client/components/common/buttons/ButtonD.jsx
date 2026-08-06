// ButtonD.jsx
import React from 'react';
import Link from 'next/link';
import { Button } from "@relume_io/relume-ui";

const baseClass =
    "button bg-accent text-foreground px-4 py-2 rounded-full border-none hover:bg-white transition-colors duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] text-black active:scale-97 text-xs sm:text-sm md:text-base";

const ButtonD = ({ href, children, className = '', ...props }) => {
    const classes = `${baseClass} ${className}`.trim();

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <Button className={classes} {...props}>
            {children}
        </Button>
    );
};

export default ButtonD;