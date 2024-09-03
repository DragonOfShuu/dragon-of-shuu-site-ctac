import { ReactNode } from "react";
import { listOfSimilars } from "../SmallMethods";
import DisplayBlock from "./DisplayBlock";
import VisualizerContextComp from "../contexts/VisualizerContextComp";
import { useVisualizer } from "../contexts/VisualizerContext";

type Props = {
    children?: ReactNode;
}


const InnerVisualizer = (props: Props) => {
    const {vData, vDispatch} = useVisualizer();
    
    let toolbarEnabled: boolean = vData.toolbarEnabled===undefined?true:vData.toolbarEnabled;

    return (
        <div className={`flex flex-col flex-grow gap-2`}>
            <div className={`flex flex-row items-stretch gap-4 self-center h-14 w-full px-4 ${toolbarEnabled?'':'opacity-50 pointer-events-none'}`}>
                {props.children}
            </div>

            <div className={`flex-grow`} style={{
                display: "grid",
                gridTemplateColumns: listOfSimilars(`${(1/vData.blocks[0]?.length)*100}%`, vData.blocks[0]?.length??0).join(" "),
                gridTemplateRows: listOfSimilars(`${(1/vData.blocks.length)*100}%`, vData.blocks.length).join(" "),
            }}>

                {
                    vData.blocks.map((row, index1) => (
                        row.map((block, index2) => (
                            <DisplayBlock {...block} 
                                blockClicked={vData.blockClicked!==undefined?vData.blockClicked:()=>{}} 
                                key={`${index1}${index2}0`} />
                        ))
                    ))
                }

            </div>
        </div>
    );
}

const Visualizer = (props: { children: ReactNode }) => {
    return (
        <VisualizerContextComp>
            <InnerVisualizer>
                {props.children}
            </InnerVisualizer>
        </VisualizerContextComp>
    )
}

export default Visualizer;