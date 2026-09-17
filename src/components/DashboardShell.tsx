import { ReactNode } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

type Props = {
    children?: ReactNode;
};

const DashboardShell = ({ children }: Props) => {
    return (
        <>
            <div className="h-nav-margin bg-black/60 backdrop-blur-sm border-b border-orange-500/30" />
            <div className="flex flex-row flex-grow items-stretch bg-black/40">
                <DashboardSidebar />
                <div className="flex-grow bg-orange-975 rounded-tl-xl">{children}</div>
            </div>
        </>
    );
};

export default DashboardShell;
