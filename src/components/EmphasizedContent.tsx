import React, { useMemo } from "react";

type HeaderTypes = "h1" | "h2" | "h3";
const headers = ["h1", "h2", "h3"];

type EmphasizedHeaderPropType = {
    alignment: "left" | "center" | "right";
} & Omit<React.JSX.IntrinsicElements["div"], "className">;

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

const EmphasizedContent = ({
    alignment,
    children,
    ...divProps
}: EmphasizedHeaderPropType) => {
    return (
        <div
            {...divProps}
            className={`flex flex-col gap-2 ${textAlign[alignment]}`}
        >
            {children}
            <div
                className={`w-24 border-2 border-amber-400 ${flexAlign[alignment]}`}
            />
        </div>
    );
};

export default EmphasizedContent;
