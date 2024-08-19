import { ButtonHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";

type Props = {
    svg: FC<SVGProps<SVGElement>>;
} & Omit<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
    "children"
>;

const LineIconButton = (props: Props) => {
    const { svg: CustomSvg, ...buttonProps } = props;

    return (
        <button {...buttonProps}>
            <CustomSvg className={`line-icon size-full object-contain`} />
        </button>
    );
};

export default LineIconButton;
