import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

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
            className={`${props.className ?? ""} special-button`}
        />
    );
};

export default SpecialButton;
