import React, { useMemo } from "react";

type HeaderTypes = "h1" | "h2" | "h3";
const headers = ["h1", "h2", "h3"];

type EmphasizedHeaderPropType = {
    alignment: "left" | "center" | "right";
} & React.JSX.IntrinsicElements["div"];

const textAlign = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
};

const flexAlign = {
    left: "self-left",
    right: "self-right",
    center: "self-center",
};

/**
 *  HTML with a line underneath.
 */
const EmphasizedContent = ({
    alignment,
    children,
    ...divProps
}: EmphasizedHeaderPropType) => {
    return (
        <div className={divProps.className}>
            <div
                {...divProps}
                className={`flex flex-col gap-2 ${textAlign[alignment]}`}
            >
                {children}
                <div
                    className={`h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-600 shadow-[0_0_12px_rgba(245,158,11,0.5)] ${flexAlign[alignment]}`}
                />
            </div>
        </div>
    );
};

export default EmphasizedContent;
