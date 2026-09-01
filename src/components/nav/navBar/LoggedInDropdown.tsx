"use client";

import Link from "next/link";
import { handleSignOut } from "@/app/lib/auth/actions";
import Image from "next/image";
import downArrowIcon from "@/assets/lineIcons/downArrowIcon.svg";
import LineIconButton from "@/components/LineIconButton";
import { useState } from "react";
import styles from "./LoggedInDropdown.module.sass";

type Props = {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
};

const LoggedInDropdown = ({ name, email, image }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleToggle = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 500);
        } else {
            setIsOpen(true);
        }
    };

    const displayName = name || email?.split("@")[0];

    return (
        <div className="relative">
            <div
                onClick={handleToggle}
                className="flex items-center gap-4 rounded-full xl:rounded-xl bg-orange-950/75 hover:bg-orange-900 p-1 xl:px-4 xl:py-1 max-w-80 overflow-hidden cursor-pointer"
            >
                <Image
                    src={image || "/default-profile.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full aspect-square"
                />
                <div className="hidden xl:flex flex-col w-full items-stretch overflow-hidden">
                    <span className="text-xl truncate w-full">
                        {displayName}
                    </span>
                    <span
                        className="text-orange-400 text-sm font-medium truncate max-w-full"
                        title={email || undefined}
                    >
                        {email}
                    </span>
                </div>
                <div className="hidden xl:flex aspect-square h-12">
                    <LineIconButton
                        svg={downArrowIcon}
                        iconClassName={`line-icon size-full object-contain transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {(isOpen || isClosing) && (
                <div
                    className={`absolute right-0 top-full mt-2 w-48 bg-orange-950 rounded-lg shadow-lg p-2 overflow-hidden ${
                        !isClosing
                            ? styles.dropdownOpen
                            : styles.dropdownClosing
                    }`}
                    onClick={handleToggle}
                >
                    <Link
                        href="/dashboard"
                        className="block w-full text-left px-3 py-2 rounded-md hover:bg-orange-900 transition-colors"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={() => handleSignOut()}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-orange-900 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoggedInDropdown;
