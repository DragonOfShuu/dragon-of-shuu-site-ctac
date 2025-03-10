import { createContext, useContext } from "react";
import { Block, Coord, SettingsType } from "../CommonTypes";

export type StartEnd = {
    start: Coord;
    end: Coord;
};

type BlockClickedType = (
    block: {
        x: number;
        y: number;
    },
    isNewClick: boolean,
) => void;

export type VisualizerDataType = {
    // Function that is ran by a block when clicked
    blockClicked: BlockClickedType | undefined;
    // If the toolbar can be clicked
    toolbarEnabled: boolean;
    // Display blocks
    blocks: Block[][];
    // Location of the Start and End
    pointPos: StartEnd | undefined;
    visualierBoxRef: React.RefObject<HTMLDivElement> | undefined;
};

export type VisualizerContextType = {
    vData: VisualizerDataType;
    vDispatch: React.Dispatch<VisualizerActionType>;
};

const visualizerContext = createContext<null | VisualizerContextType>(null);

export const useVisualizer = () => {
    return useContext(visualizerContext) as VisualizerContextType;
};

export type VisualizerActionType =
    | { type: "update"; data: Partial<VisualizerDataType> }
    | { type: "toolbar"; enabled: boolean }
    | { type: "blocks"; newBlocks: Block[][] }
    | { type: "block"; newBlock: Block }
    | { type: "setVisualizerRef"; newRef: React.RefObject<HTMLDivElement> };

export const VisualizerReducer = (
    prevState: VisualizerDataType,
    action: VisualizerActionType,
): VisualizerDataType => {
    switch (action.type) {
        case "update": {
            return { ...prevState, ...action.data };
        }
        case "toolbar": {
            return { ...prevState, toolbarEnabled: action.enabled };
        }
        case "blocks": {
            return { ...prevState, blocks: action.newBlocks };
        }
        case "block": {
            const newBlock = { ...action.newBlock };
            if (
                JSON.stringify(newBlock) ===
                JSON.stringify(prevState.blocks[newBlock.y][newBlock.x])
            ) {
                return prevState;
            }
            const newBlocks = [...prevState.blocks];
            newBlocks[newBlock.y] = [...newBlocks[newBlock.y]];
            newBlocks[newBlock.y][newBlock.x] = newBlock;
            return { ...prevState, blocks: newBlocks };
        }
        case "setVisualizerRef": {
            return { ...prevState, visualierBoxRef: action.newRef };
        }
    }
};

export default visualizerContext;
