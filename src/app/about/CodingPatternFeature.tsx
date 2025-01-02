import EmphasizedContent from '@/components/EmphasizedContent';
import fullscreenStyles from './fullscreenFeature.module.sass'
import { ReactNode } from "react";


const CodingPatternFeature = () => {
    return (
        <div className={`${fullscreenStyles.fullscreenFeatureMargin} py-4 flex flex-col justify-center items-center`}>
            <div className={`max-w-[1200px] mx-auto sm:px-4`}>
                <EmphasizedContent alignment={'center'} className={`mb-4`}>
                    <h1 className={`text-orange-400`}>
                        Following Coding Patterns
                    </h1>
                </EmphasizedContent>
                <p className={`text-center text-xl mb-8`}>
                    I like to follow many rules of programming to make
                    my code easier for others and myself to read, as well
                    as making my code sharper and more reusable.
                </p>
            </div>
            <div className={`flex p-4 flex-wrap items-start justify-center content-start gap-4`}>
                {
                    (() => {
                        const allContent = []
                        for (let i = 0; i<6; i++) {
                            allContent.push(
                                <PatternDivider title={`DRY Code`} subtitle={`"Don't Repeat Yourself"`} key={i}>
                                    <p>
                                        I focus on writing DRY code. DRY code makes
                                        your code consistent, and easier to 
                                    </p>
                                </PatternDivider>
                            )
                        }
                        return allContent;
                    })()
                }
            </div>
        </div>
    )
}

const PatternDivider = (props: {title: string; subtitle?: string, className?: string; children?: ReactNode}) => {
    return (
        <div className={props.className}>
            <div className={`size-full rounded-md border-2 border-orange-500 bg-orange-950 bg-opacity-50 p-4 max-w-96`}>
                <h2>
                    {props.title}
                </h2>
                {
                    !props.subtitle?<></>:(
                        <h3 className={`mt-1`}>
                            {props.subtitle}
                        </h3>
                    )
                }
                <div className={`mb-4`} />
                {props.children}
            </div>
        </div>
    )
}

export default CodingPatternFeature;
