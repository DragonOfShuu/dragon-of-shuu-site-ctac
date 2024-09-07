import { useRef, useState } from "react";

type TileBlockProps = {
    selected: boolean;
    clickCallback: (indexKey: number) => any;
    color: string;
    index: number;
    tooltip: string;
};

const TileBlock = ({
    selected,
    clickCallback,
    color,
    index,
    tooltip,
}: TileBlockProps) => {
    let dialogRef = useRef<HTMLDialogElement>(null);

    const clicked = () => {
        if (!selected) clickCallback(index);
    };

    const mouseOver = () => {
        if (dialogRef.current == null) return;
        dialogRef.current.show();
    };

    const noMouseOver = () => {
        if (dialogRef.current == null) return;
        dialogRef.current.close();
    };

    return (
        <div className={`h-full w-12 flex items-stretch relative`}>
            <dialog
                ref={dialogRef}
                className={`bg-transparent absolute pointer-events-none`}
            >
                <div className={`absolute z-20 w-24`}>
                    <p className={`p-2 bg-transparent text-white`}>{tooltip}</p>
                </div>
            </dialog>
            <div
                className={`border-2 border-solid ${selected ? `border-white` : `border-transparent hover:border-gray-300`} flex items-stretch rounded-xl overflow-hidden`}
                onClick={clicked}
                onMouseOver={mouseOver}
                onMouseOut={noMouseOver}
                title={tooltip}
            >
                <div
                    className={`w-12 h-full`}
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
};

export type TileType<T> = {
    color: string;
    returns: T;
    tooltip?: string;
};

type ChooserProp<T> = {
    content: TileType<T>[];
    changedCallback?: (newValue: T) => any;
};

export default function MultiChooser<TReturnType>({
    content,
    changedCallback,
}: ChooserProp<TReturnType>) {
    const [selected, setSelected] = useState<number>(0);

    const clicked = (indexKey: number) => {
        setSelected(indexKey);
        if (changedCallback !== undefined) {
            changedCallback(content[indexKey].returns);
        }
    };

    return (
        <div className="flex items-stretch justify-between">
            {content.map((element, index) => (
                <TileBlock
                    color={element.color}
                    clickCallback={clicked}
                    index={index}
                    key={index}
                    selected={selected == index}
                    tooltip={
                        element.tooltip != undefined ? element.tooltip : ""
                    }
                />
            ))}
        </div>
    );
}
