import SpecialButton from "@/components/SpecialButton";
import Image from "next/image";

type Props = {
    onClick: () => void;
    className?: string;
    text?: string;
    alt?: string;
    image?: SVGRPropsType;
};

const ToolBarButton = (props: Props) => {
    const isText = props.image == undefined;

    return (
        <SpecialButton
            onClick={props.onClick}
            className={`${isText ? "px-4" : ""} ${props.className ? props.className : ""}`}
            title={props.alt}
        >
            {isText ? (
                props.text ? (
                    props.text
                ) : (
                    "N/A"
                )
            ) : (
                <props.image className={`h-full w-6 md:w-14`} alt={props.alt} />
            )}
        </SpecialButton>
    );
};

export default ToolBarButton;
