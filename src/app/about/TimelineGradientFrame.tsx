"use client";

import EmphasizedContent from "@/components/EmphasizedContent";
import useNavBar from "@/components/nav/navBar/NavBarContext";
import { ReactNode, useEffect, useRef } from "react";

const navBarHideReasonKey = "timelineView";

const useOnScroll = (scrollHandler: () => void) => {
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    });
};

const TimelineGradientFrame = ({ children }: { children: ReactNode }) => {
    const stickiedTimeline = useRef<null | HTMLDivElement>(null);
    const { navBarData, setNavBarData } = useNavBar();

    const scrollHandler = () => {
        const element = stickiedTimeline.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();

        if (rect.y < 100 && rect.y >= 0) {
            setNavBarData({
                type: "visibility",
                visible: false,
                reasonKey: navBarHideReasonKey,
            });
            return;
        }

        if (navBarData.hiddenReasons.includes(navBarHideReasonKey)) {
            setNavBarData({
                type: "visibility",
                visible: true,
                reasonKey: navBarHideReasonKey,
            });
        }
    };
    useOnScroll(scrollHandler);

    return (
        <>
            <div className={`sticky z-40 top-0`} ref={stickiedTimeline}>
                <EmphasizedContent
                    alignment={"center"}
                    className={`bg-orange-975 bg-opacity-80 backdrop-blur-md py-4`}
                >
                    <h1>Timeline</h1>
                </EmphasizedContent>
                <div
                    className={`h-8 bg-gradient-to-b from-orange-975 to-transparent`}
                />
            </div>
            <div className={`relative max-w-[1000px] mx-auto`}>
                <div
                    className={`absolute left-4 border-dashed border-orange-300 border-opacity-50 border-l-8 w-0 h-full -z-10`}
                />
                {children}
            </div>
            <div
                className={`sticky z-40 bottom-0 h-8 bg-gradient-to-t from-orange-975 to-transparent`}
            />
        </>
    );
};

export default TimelineGradientFrame;
