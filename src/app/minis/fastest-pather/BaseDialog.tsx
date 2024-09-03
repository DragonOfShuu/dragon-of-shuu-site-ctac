import { MouseEvent, ReactNode, RefObject, useState } from "react";
import Image from "next/image";
import Plus from "./icons/plusIcon.svg";
import styles from "./BaseDialog.module.sass";

type DialogToolbarProps = {
    image: any;
    alt: string;
    click: (e: any) => any;
};

type BaseDialogProps = {
    children?: ReactNode;
    topBar?: DialogToolbarProps[];
    dialogRef: RefObject<HTMLDialogElement>;
    className?: string;
};

const BaseDialog = (props: BaseDialogProps) => {
    const clickOutsideDialog = (event: MouseEvent<HTMLDialogElement>) => {
        if (props.dialogRef.current === null) return;

        let rect = props.dialogRef.current.getBoundingClientRect();
        return !(
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
        );
    };

    const [currentClickOutside, setCCO] = useState<boolean | undefined>(false);

    const onDown = (e: MouseEvent<HTMLDialogElement>) => {
        setCCO(clickOutsideDialog(e));
    };

    const onClick = (e: MouseEvent<HTMLDialogElement>) => {
        if (currentClickOutside && clickOutsideDialog(e)) close();
        setCCO(false);
    };

    const close = () => {
        if (props.dialogRef.current === null) return;

        props.dialogRef.current.close();
    };

    return (
        <dialog
            ref={props.dialogRef}
            className={`${styles.dialogBox} ${props.className ?? ""}`}
            onMouseDown={onDown}
            onClick={onClick}
        >
            <div className={`${styles.innerGrid}`}>
                <div className={`flex flex-row items-center`}>
                    {props.topBar?.map((icon, index) => (
                        <icon.image
                            alt={icon.alt}
                            title={icon.alt}
                            width={20}
                            height={20}
                            className={`cursor-pointer opacity-40 hover:opacity-90`}
                            onClick={icon.click}
                            key={index}
                        />
                    ))}
                    <div className={`grow`} />
                    <Plus
                        alt="Exit Dialog"
                        title="Exit Dialog"
                        width={20}
                        height={20}
                        className="cursor-pointer opacity-40 hover:opacity-90 rotate-45"
                        onClick={close}
                    />
                </div>
                <div className={`${styles.innerDialogDiv}`}>
                    {props.children}
                </div>
            </div>
        </dialog>
    );
};

export default BaseDialog;
