import { useRef } from "react";
import BaseDialog from "../BaseDialog";
import CircleQuestion from "./../assets/circle-question";
import Markdown from "react-markdown";
import styles from "./BaseHelp.module.sass";

type Props = {
    children: string;
};

const BaseHelp = (props: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <CircleQuestion
                scale={50}
                className={`self-center hover:fill-white cursor-pointer w-8 h-auto`}
                onClick={() => dialogRef.current?.showModal()}
            />
            <BaseDialog dialogRef={dialogRef} className={`lg:w-3/4 xl:w-3/5`}>
                <div className="overflow-y-scroll max-h-[600px] w-full flex flex-col">
                    <Markdown className={`${styles.markdownStyles}`}>
                        {props.children}
                    </Markdown>
                </div>
            </BaseDialog>
        </>
    );
};

export default BaseHelp;
