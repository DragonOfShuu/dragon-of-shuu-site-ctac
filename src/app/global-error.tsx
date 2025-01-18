"use client";

import ErrorComponent from "@/components/ErrorComponent";

const GlobalError = ({ error, reset }: NextErrorComponentPropType) => {
    return (
        <html>
            <body>
                <div
                    className={`absolute -z-20 inset-0 flex items-center justify-center`}
                    style={{
                        background: `repeating-linear-gradient(35deg, #00000000, #00000000 10px, #43140777 11px 20px)`,
                    }}
                >
                    <ErrorComponent
                        error={error}
                        reset={reset}
                        className={`w-full md:w-3/4 h-[75vh]`}
                    />
                </div>
            </body>
        </html>
    );
};

export default GlobalError;
