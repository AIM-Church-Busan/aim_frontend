import React from 'react';
import {Button} from "@relume_io/relume-ui";

const ButtonD = ({children}) => {
    return (
        <Button
            className="bg-lime-400 text-foreground px-4 py-2 rounded-full border-none
            hover:bg-white transition-colors duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
            {children}
        </Button>
    );
};

export default ButtonD;