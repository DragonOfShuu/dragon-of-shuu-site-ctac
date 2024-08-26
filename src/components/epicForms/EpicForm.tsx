import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import styles from './EpicForms.module.sass'
import EpicFormContextComp from "@/components/epicForms/EpicFormContextComp";

type EpicFormPropType = {

} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

/**
 * Acts as a wrapper for Epic Forms, and adds context
 * @param props form props, as well as Epic Form wrapper props
 */
const EpicForm = (props: EpicFormPropType) => {
    return (
        <EpicFormContextComp>
            <EpicFormInner {...props} />
        </EpicFormContextComp>
    )
}

const EpicFormInner = (props: EpicFormPropType) => {
    const {className, ...formProps} = props;
    
    return (
        <div className={className}>
            <form {...formProps} className={`${styles.formRoot}`} />
        </div>
    )

}

export default EpicForm;