import EmphasizedContent from '@/components/EmphasizedContent';
import fullscreenStyles from './fullscreenFeature.module.sass'

type TimelineFeaturePropType = {

}

const TimelineFeature = (props: TimelineFeaturePropType) => {
    return (
        <div className={`${fullscreenStyles.fullscreenFeature}`}>
            <div className={`nav-margin`} />
            <EmphasizedContent alignment={'center'}>
                <h1>
                    Timeline
                </h1>
            </EmphasizedContent>
        </div>
    )
}

export default TimelineFeature;