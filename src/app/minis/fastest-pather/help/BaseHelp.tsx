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
                className={`self-center hover:fill-white cursor-pointer`}
                onClick={() => dialogRef.current?.showModal()}
            />
            <BaseDialog dialogRef={dialogRef} className={`w-1/2`}>
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
