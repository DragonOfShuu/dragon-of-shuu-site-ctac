import { ReactNode, useReducer } from "react";
import VisualizerContext, {
    VisualizerDataType,
    VisualizerReducer,
} from "./VisualizerContext";

const defaultVisualizer: VisualizerDataType = {
    blocks: [],
    toolbarEnabled: true,
    blockClicked: undefined,
    pointPos: undefined,
};

const VisualizerContextComp = (props: { children: ReactNode }) => {
    const [visualizerData, visualizerDispatch] = useReducer(
        VisualizerReducer,
        defaultVisualizer,
    );

    return (
        <VisualizerContext.Provider
            value={{ vData: visualizerData, vDispatch: visualizerDispatch }}
        >
            {props.children}
        </VisualizerContext.Provider>
    );
};

export default VisualizerContextComp;
