"use client";

import ChooseSize from "./pageModules/chooseSize/Index";
import Painter from "./pageModules/painter/Index";
import Runner from "./pageModules/runner/Index";

import Visualizer from "./visualizerParts/Visualizer";
import PageContextComp from "./contexts/PageContextComp";
import { usePages } from "./contexts/PageContext";

type Props = {}

const PagerInner = (props: Props) => {
    const {page} = usePages();

     return (
        <div className={`flex h-full flex-grow`}>
            <Visualizer>
                {
                    (() => {
                        switch (page) {
                            case 'SIZER': return <ChooseSize />
                            case 'PAINTER': return <Painter />
                            case 'RUNNER': return <Runner />
                        }
                    })()
                }
            </Visualizer>
        </div>
     )
}

const Pager = (_: {}) => {
    return (
        <PageContextComp defaultPage={"SIZER"}>
            <PagerInner />
        </PageContextComp>
    )
}

export default Pager;