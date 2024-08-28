import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import styles from "./SpecialButton.module.sass";

type Props = {
    notProminent?: boolean;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const SpecialButton = (props: Props) => {
    const { notProminent, ...buttonProps } = props;

    return (
        <button
            {...buttonProps}
            data-prominent={!(notProminent ?? false)}
            className={`${props.className ?? ""} ${styles.specialButton}`}
        />
    );
};

export default SpecialButton;
