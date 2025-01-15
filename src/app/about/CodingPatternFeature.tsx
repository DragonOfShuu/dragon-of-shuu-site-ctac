import EmphasizedContent from '@/components/EmphasizedContent';
import fullscreenStyles from './fullscreenFeature.module.sass'
import { ReactNode } from "react";
import Viewable3dDiv from '@/components/effects/Viewable3dDiv';


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
            <div className={`flex p-4 flex-wrap items-stretch justify-center gap-4`}>
            {/* <div className={`grid grid-flow-col p-4 gap-4`}> */}
                    <PatternDivider title={`DRY Code`} subtitle={`"Don't Repeat Yourself"`}>
                        <p>
                            I focus on writing DRY code. DRY code makes
                            your code consistent, and easier to read.
                        </p>
                    </PatternDivider>
                    <PatternDivider title={`Early Returns`}>
                        <p>
                            Early returns avoid your code from being
                            too long, and allows you to avoid repetitive
                            if/else statements too.
                        </p>
                    </PatternDivider>
                    <PatternDivider title={`NO if/else`}>
                        <p>
                            Having large if/else statement blocks make
                            your code hard to follow. Removing if/else
                            statements is easy when you use early 
                            returns.
                        </p>
                    </PatternDivider>
                    <PatternDivider title={`Extract Methods`}>
                        <p>
                            When code inside of a function gets to large,
                            it can be hard to read and make sense of. When
                            this happens, you should extract code into 
                            its own function.
                        </p>
                    </PatternDivider>
                    <PatternDivider title={`Componentization`}>
                        <p>
                            Code should be componentized and separated 
                            as to avoid close coupling between code.
                        </p>
                    </PatternDivider>
            </div>
        </div>
    )
}

const PatternDivider = (props: {title: string; subtitle?: string, className?: string; children?: ReactNode}) => {
    return (
        <div className={props.className}>
            <Viewable3dDiv className={`h-full`} maxTurn={20}>
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
            </Viewable3dDiv>
        </div>
    )
}

export default CodingPatternFeature;
