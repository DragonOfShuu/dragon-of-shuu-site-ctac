import { ReactNode } from "react";
import styles from './EpicForms.module.sass'

export type EpicFormRowPropType = {
    children?: ReactNode,
    fieldname: string,
    paramName: string
}

const EpicFormRow = (props: EpicFormRowPropType) => {
    return (
        <div className={`${styles.formRow}`}>
            <label htmlFor={props.paramName}>{props.fieldname}</label>
            <div className={`${styles.formRowChildren}`}>
                {props.children}
            </div>
        </div>
    )
}

export default EpicFormRow;