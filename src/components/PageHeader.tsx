import { ReactNode } from "react"

export type PageHeaderProps = {
    children?: ReactNode;
    background?: ReactNode;
}

const PageHeader = (props: PageHeaderProps) => {
    return (
        <div className={`relative w-full h-96`}>
            <div className={`absolute inset-0 -z-10`}>
                {props.background}
            </div>
            <div className="absolute inset-0 z-10">
                <div className="size-full flex flex-col justify-center align-start p-4 md:p-16 space-y-5">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default PageHeader;