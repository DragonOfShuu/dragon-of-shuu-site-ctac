"use client";

import Link from "next/link";
import { UrlObject } from "url";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement, SVGProps } from "react";

type Props = {
    href: string | UrlObject;
    label: string;
    children: ReactElement<SVGProps<SVGSVGElement>>;
};

// Normalize trailing slashes so if they are left in by mistake.
const stripTrailingSlash = (path: string) =>
    path.length > 1 ? path.replace(/\/+$/, "") : path;

const SidebarTab = ({ href, label, children }: Props) => {
    const pathname = usePathname();
    const isActive =
        typeof href === "string" &&
        stripTrailingSlash(pathname) === stripTrailingSlash(href);

    return (
        <Link
            href={href}
            className={`flex flex-row items-center gap-4 py-2 px-4 hover:bg-orange-200/20 rounded-md cursor-pointer ${isActive ? "text-orange-500" : ""}`}
        >
            {cloneElement(children, {
                className: `${isActive ? "line-icon-orange" : "line-icon"} h-8 w-auto`,
            })}
            <span className="text-lg">{label}</span>
        </Link>
    );
};

export default SidebarTab;
