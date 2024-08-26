import { ButtonHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";

type Props = {
    svg: SVGRPropsType;
    iconClassName?: string;
} & Omit<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
    "children"
>;

const LineIconButton = (props: Props) => {
    const { svg: CustomSvg, iconClassName, ...buttonProps } = props;

    return (
        <button {...buttonProps}>
            <CustomSvg
                className={`${iconClassName ?? `line-icon`} size-full object-contain`}
            />
        </button>
    );
};

export default LineIconButton;
