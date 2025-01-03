import EmphasizedContent from '@/components/EmphasizedContent';
import fullscreenStyles from './fullscreenFeature.module.sass'
import { ReactNode } from 'react';

type TimelineFeaturePropType = {

}

const TimelineFeature = (props: TimelineFeaturePropType) => {
    return (
        <div className={`${fullscreenStyles.fullscreenFeature} flex flex-col`}>
            <div className={`nav-margin`} />
            <div className={`relative grow w-full max-w-[1400px] self-center`}>
                <div className={`absolute left-4 border-dashed border-orange-300 border-opacity-50 border-l-8 w-0 h-full`} />
                <TimelineGradientFrame>
                    {/* {
                        (() => {
                            const newElements = []
                            for (let i = 0; i < 100; i++) {
                                newElements.push(<div key={i}>Your Mom</div>)
                            }
                            return newElements
                        })()
                    } */}
                    <TimelineMomento title={`My First Computer`} year={2014}>
                        asdf
                    </TimelineMomento>
                </TimelineGradientFrame>
            </div>
        </div>
    )
}

const TimelineGradientFrame = ({children}: {children: ReactNode}) => {
    return (
        <>
            <div className={`sticky top-nav-margin`}>
                <EmphasizedContent alignment={'center'} className={`bg-orange-975`}>
                    <h1>
                        Timeline
                    </h1>
                </EmphasizedContent>
                <div className={`h-8 bg-gradient-to-b from-orange-975 to-transparent`} />
            </div>
            {children}
            <div className={`sticky bottom-0 h-8 bg-gradient-to-t from-orange-975 to-transparent z-40`} />
        </>
    )
}

type TimelineMomentoPropType = {
    year: number
    title: string
    children: ReactNode
}

const TimelineMomento = (props: TimelineMomentoPropType) => {
    return (
        <div className={`flex items-stretch ${fullscreenStyles.fullscreenFeature}`}>
            <div>
                <div className="rounded-full border-2 border-orange-500 fixed top-8 size-4">

                </div>
            </div>
        </div>
    )
}

export default TimelineFeature;
