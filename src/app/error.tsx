"use client";

import ErrorComponent from "@/components/ErrorComponent";
import { useEffect } from "react";

type ErrorPagePropType = {

} & NextErrorComponentPropType;

const ErrorPage = ({ error, reset }: ErrorPagePropType) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={`pt-nav-margin md:pt-0 size-full min-h-[inherit] h-0 grow`}>
            <div className={`size-full flex items-center justify-center`}>
                <ErrorComponent error={error} reset={reset} className={`w-full md:w-3/4 h-[75vh]`} />
            </div>
        </div>
    );
};

export default ErrorPage;
