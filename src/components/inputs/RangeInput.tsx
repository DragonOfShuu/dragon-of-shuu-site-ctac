import { InputHTMLAttributes, useState } from "react";
import styles from "./RangeInput.module.sass";

type RangeProps = {
    text?: string;
    labelClassName?: string;
};

const RangeInput = ({
    text,
    labelClassName,
    ...props
}: RangeProps & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) => {
    return (
        <label className={`flex flex-col gap-2 ${labelClassName ?? ""}`}>
            {`${text ?? ""} [${props.value}]`}
            <input {...props} type="range" className={`${styles.range}`} />
        </label>
    );
};

export default RangeInput;
