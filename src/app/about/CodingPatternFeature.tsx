import FullscreenFeature from "@/app/about/FullscreenFeature"
import { ReactNode } from "react";


const CodingPatternFeature = () => {
    return (
        <FullscreenFeature>
            <h1>
                Following Coding Patterns
            </h1>
            <p>
                I like to follow many rules of programming to make
                my code easier for others and myself to read, as well
                as making my code sharper and more reusable.
            </p>
            <div className={`flex p-4 flex-wrap items-start gap-2 h-full`}>
                <PatternDivider title={`DRY Code`}>
                    <p>
                        &ldquo;Don&rsquo;t Repeat Yourself&rdquo;
                    </p>
                    <p>
                        I focus on writing DRY code. DRY code makes
                        your code consistent, and easier to 
                    </p>
                </PatternDivider>
            </div>
        </FullscreenFeature>
    )
}

const PatternDivider = (props: {title: string; className?: string; children?: ReactNode}) => {
    return (
        <div className={props.className}>
            <div className={`size-full rounded-md border-2 border-orange-400 p-4`}>
                <h2 className={`mb-4`}>
                    {props.title}
                </h2>
                {props.children}
            </div>
        </div>
    )
}

export default CodingPatternFeature;
