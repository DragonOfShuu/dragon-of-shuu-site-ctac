import EmphasizedContent from '@/components/EmphasizedContent';
import fullscreenStyles from './fullscreenFeature.module.sass'
import styles from './TimelineFeature.module.sass'
import { ReactNode } from 'react';

type TimelineFeaturePropType = {

}

const TimelineFeature = (props: TimelineFeaturePropType) => {
    const loremIpsium = `Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl bibendum porttitor consequat consectetur vitae ut nunc massa. Vestibulum aliquet justo semper dictumst nisl malesuada. Praesent imperdiet erat felis est potenti, pulvinar egestas. Facilisis ac felis accumsan feugiat rutrum, volutpat dictumst massa. Magna facilisi condimentum ac nisl penatibus faucibus? Taciti litora montes sapien tellus orci magna. Sapien ullamcorper sapien class condimentum mi vivamus. Purus per turpis semper primis pulvinar pulvinar inceptos cras. Mi purus fames; odio mollis quam nullam dui tempor.\nAmet senectus per aliquam, risus eleifend ultricies rhoncus mus. Posuere aliquam iaculis quis ornare in suspendisse. Lectus elit penatibus massa mattis, aptent volutpat. Egestas viverra pretium, praesent mollis netus curae penatibus. Vivamus elit suscipit ullamcorper habitasse semper himenaeos pretium montes. Commodo aptent odio quisque dapibus fusce; molestie primis? Inceptos non etiam tempor lectus maximus aptent.`

    const loremIpsiumHtml = loremIpsium.split('\n').map((paragraph, ind) => (
        <p key={ind} className={`sm:text-xl lg:text-3xl`}>
            {paragraph}
        </p>
    ))

    return (
        <div className={`${fullscreenStyles.fullscreenFeature} flex flex-col`}>
            <div className={`nav-margin`} />
            <div className={`relative grow w-full max-w-[1400px] self-center`}>
                <div className={`absolute left-4 border-dashed border-orange-300 border-opacity-50 border-l-8 w-0 h-full -z-10`} />
                <TimelineGradientFrame>
                    <div className={`space-y-4`}>
                        <TimelineMomento title={`My First Code`} year={2014}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First Computer`} year={2015}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First "Good" Scratch Project`} year={2016}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First Website`} year={2018}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First Time Cheating on Math Homework`} year={2021}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First Database`} year={2022}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                        <TimelineMomento title={`My First Programming Language`} year={2023}>
                            {loremIpsiumHtml}
                        </TimelineMomento>
                    </div>
                </TimelineGradientFrame>
            </div>
        </div>
    )
}

const TimelineGradientFrame = ({children}: {children: ReactNode}) => {
    return (
        <>
            <div className={`sticky z-50 top-nav-margin`}>
                <EmphasizedContent alignment={'center'} className={`bg-orange-975 bg-opacity-80 backdrop-blur-md`}>
                    <h1>
                        Timeline
                    </h1>
                </EmphasizedContent>
                <div className={`h-8 bg-gradient-to-b from-orange-975 to-transparent`} />
            </div>
            {children}
            <div className={`sticky z-40 bottom-0 h-8 bg-gradient-to-t from-orange-975 to-transparent`} />
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
        <div className={`flex items-stretch ${fullscreenStyles.fullscreenFeatureMargin}`}>
            <div>
                <div className={`sticky top-40`}>
                    <div className={`${styles.blipCircle} rounded-full border-4 border-orange-500 bg-orange-975 size-10`} />
                    <p className={`text-center w-full`}><time dateTime={`${props.year}`}>{props.year}</time></p>
                </div>
            </div>
            <div className={`ml-8`}>
                <h2 className={`${styles.glideRight} text-orange-500 font-bold mb-4`}>
                    {props.title}
                </h2>
                <div className={`space-y-4 ${styles.glideBottom}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default TimelineFeature;
