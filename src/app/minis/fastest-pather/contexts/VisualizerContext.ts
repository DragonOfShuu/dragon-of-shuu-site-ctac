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
    | { type: "blocks"; newBlocks: Block[][] };

export const VisualizerReducer = (
    prevState: VisualizerDataType,
    action: VisualizerActionType,
): VisualizerDataType => {
    // const newState = {...prevState};

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
    }
};

export default visualizerContext;
