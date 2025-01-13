import Image from "next/image";
import { ReactNode } from "react";
import headerImage from "@/assets/abstractCommon/HeaderBackground.png";

export type PageHeaderProps = {
    children?: ReactNode;
    background?: ReactNode;
    fullscreen?: boolean;
};

const PageHeader = (props: PageHeaderProps) => {
    return (
        <div className={`relative w-full ${props.fullscreen ? `min-h-screen` :`h-52 md:h-72`}`}>
            <div className={`absolute inset-0 -z-10`}>
                {props.background ?? (
                    <Image
                    alt={`Abstract Page Header`}
                    src={headerImage}
                    className={`size-full object-cover`}
                    />
                )}
            </div>

            <div className="relative z-10 h-full">
                <div className="size-full flex flex-col justify-end md:justify-center align-start p-4 md:p-16 space-y-5 background-dark-double-shade">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
