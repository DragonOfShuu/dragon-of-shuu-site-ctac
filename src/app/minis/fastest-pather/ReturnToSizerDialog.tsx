import { useRef } from "react";
import backIcon from "./icons/leftArrow.svg";
import ToolBarButton from "./toolBarElements/ToolBarButton";
import BaseDialog from "./BaseDialog";
import { usePages } from "./contexts/PageContext";
import SpecialButton from "@/components/SpecialButton";

type Props = {
    beforePageChange?: () => unknown;
};

const ReturnToSizerDialog = (props: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { setPage } = usePages();

    const buttonClassnames = ``;

    const switchToSizer = () => {
        props.beforePageChange?.();
        setPage("SIZER");
    };

    return (
        <>
            <ToolBarButton
                onClick={() => dialogRef.current?.showModal()}
                image={backIcon}
                alt="Return to Sizer"
            />
            <BaseDialog dialogRef={dialogRef}>
                {/* <p className={`text-3xl p-5`}> */}
                <p className={``}>
                    {`Are you sure you want to return to the sizer?`}
                </p>
                <div className="flex flex-row gap-2 items-stretch">
                    <SpecialButton
                        onClick={switchToSizer}
                        className={`${buttonClassnames}`}
                    >
                        Yes
                    </SpecialButton>
                    <SpecialButton
                        onClick={() => dialogRef.current?.close()}
                        className={`${buttonClassnames}`}
                    >
                        No
                    </SpecialButton>
                </div>
            </BaseDialog>
        </>
    );
};

export default ReturnToSizerDialog;
