import { randomItem } from "@/clientlibs/random";
import SpecialButton from "@/components/SpecialButton";

import type { JSX } from "react";

export type ErrorComponentPropType = {} & NextErrorComponentPropType &
    JSX.IntrinsicElements["div"];

const ErrorComponent = (props: ErrorComponentPropType) => {
    const { error, reset, ...divProps } = props;

    const snarkyComment = randomItem([
        "This happens sometimes.",
        "Why today?",
        "Just send an email to loganmcederlof@gmail.com. He'll fix it.",
        "lol",
    ]);

    return (
        <div {...divProps}>
            <div className={`size-full relative`}>
                <h1
                    className={`hidden md:block absolute -z-10 md:-top-12 md:-left-12 md:text-7xl font-bold font-mono text-amber-500/15`}
                >
                    ERROR
                </h1>
                <div className={`flex flex-col p-4 h-full non-prominent-frame`}>
                    <h2>Oh No, Something Went Wrong!</h2>
                    <p>{snarkyComment}</p>
                    <div
                        className={`bg-black/60 border border-red-500/40 rounded-md p-2 my-4 grow overflow-auto`}
                    >
                        <pre className={``}>{error.stack}</pre>
                    </div>
                    <SpecialButton onClick={reset}>Reload</SpecialButton>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
