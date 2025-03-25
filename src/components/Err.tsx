import React from "react";
import { SyntaxError } from "@fmfi-uk-1-ain-412/js-fol-parser";
import SyntErr from "./SyntErr";

interface ErrProps {
    inputString: string | null;
    errors: (Error | SyntaxError | null)[];
}

const Err: React.FC<ErrProps> = ({inputString, errors}) => {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="err">
            {errors.map((error, index) => {
                if (error instanceof SyntaxError && inputString !== null) {
                    return <SyntErr key={index} inputString={inputString} error={error} />;
                }
                return (
                    <div key={index} className="err">
                        {error?.message}
                    </div>
                );
            })}
        </div>
    );
};

export default Err;