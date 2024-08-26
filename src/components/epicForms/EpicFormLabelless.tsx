import { ReactNode } from "react";
import styles from './EpicForms.module.sass'

export type EpicFormLabellessPropType = {
    children?: ReactNode;
}

const EpicFormLabelless = (props: EpicFormLabellessPropType) => {
    return (
        <div className={`${styles.formRow}`}>
            <div className={`${styles.takeFirstCol}`} />
            <div className={`${styles.formRowChildren}`}>
                {props.children}
            </div>
        </div>
    )
}

export default EpicFormLabelless;