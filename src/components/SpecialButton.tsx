import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "./SpecialButton.module.sass";

type Props = {
    prominent?: boolean;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const SpecialButton = (props: Props) => {
    const { prominent, ...buttonProps } = props;

    return (
        <button
            {...buttonProps}
            data-prominent={prominent ?? true}
            className={`${props.className ?? ""} ${styles.specialButton}`}
        />
    );
};

export default SpecialButton;
