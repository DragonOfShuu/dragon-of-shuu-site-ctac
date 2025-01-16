import EmphasizedContent from "@/components/EmphasizedContent";
import fullscreenStyles from "./fullscreenFeature.module.sass";
import styles from "./TimelineFeature.module.sass";
import { ReactNode } from "react";
import TimelineMomentos from "@/app/about/TimelineMomentos";
import Markdown from "react-markdown";

type TimelineFeaturePropType = {};

const TimelineFeature = (props: TimelineFeaturePropType) => {
    return (
        <div className={`${fullscreenStyles.fullscreenFeature} flex flex-col`}>
            <div className={`nav-margin`} />
            <div className={`relative grow w-full max-w-[1400px] self-center`}>
                <div
                    className={`absolute left-4 border-dashed border-orange-300 border-opacity-50 border-l-8 w-0 h-full -z-10`}
                />
                <TimelineGradientFrame>
                    <div className={`space-y-4`}>
                        {TimelineMomentos.map((momento, index) => (
                            <TimelineMomento
                                title={momento.title}
                                year={momento.year}
                                key={index}
                            >
                                {momento.content.map((content, index1) => {
                                    if (typeof content === "string")
                                        return (
                                            <Markdown key={-index1}>
                                                {content}
                                            </Markdown>
                                        );

                                    return content;
                                })}
                            </TimelineMomento>
                        ))}
                    </div>
                </TimelineGradientFrame>
            </div>
        </div>
    );
};

const TimelineGradientFrame = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className={`sticky z-40 top-nav-margin`}>
                <EmphasizedContent
                    alignment={"center"}
                    className={`bg-orange-975 bg-opacity-80 backdrop-blur-md`}
                >
                    <h1>Timeline</h1>
                </EmphasizedContent>
                <div
                    className={`h-8 bg-gradient-to-b from-orange-975 to-transparent`}
                />
            </div>
            {children}
            <div
                className={`sticky z-40 bottom-0 h-8 bg-gradient-to-t from-orange-975 to-transparent`}
            />
        </>
    );
};

type TimelineMomentoPropType = {
    year: number;
    title: string;
    children: ReactNode;
};

const TimelineMomento = (props: TimelineMomentoPropType) => {
    return (
        <div
            className={`flex items-stretch ${fullscreenStyles.fullscreenFeatureMargin}`}
        >
            <div>
                <div className={`sticky top-40`}>
                    <div
                        className={`${styles.blipCircle} rounded-full border-4 border-orange-500 bg-orange-975 size-10`}
                    />
                    <p className={`text-center w-full`}>
                        <time dateTime={`${props.year}`}>{props.year}</time>
                    </p>
                </div>
            </div>
            <div className={`ml-8 overflow-clip`}>
                <h2
                    className={`${styles.glideRight} text-orange-500 font-bold mb-4`}
                >
                    {props.title}
                </h2>
                <div
                    className={`space-y-4 sm:text-xl lg:text-3xl ${styles.glideBottom} ${styles.momentoElementStyles}`}
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default TimelineFeature;
