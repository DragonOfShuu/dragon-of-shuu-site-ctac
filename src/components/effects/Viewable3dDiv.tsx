"use client";

import { useRef, useState } from 'react';
import styles from './Viewable3dDiv.module.sass'

type Viewable3dDivPropType = {
    maxTurn?: number,
    turnMultiplier?: number,
    xMultiplier?: number,
    yMultiplier?: number,
} & React.JSX.IntrinsicElements['div']

const Viewable3dDiv = (props: Viewable3dDivPropType) => {
    const {children, className, maxTurn, turnMultiplier, xMultiplier, yMultiplier, ...divProps} = props;

    const [xRot, setXRot] = useState(0)
    const [yRot, setYRot] = useState(0)
    const viewBoxDiv = useRef<HTMLDivElement|null>(null)

    const rotateX = -yRot*(turnMultiplier??1)*(xMultiplier??1)*(props.maxTurn??5)
    const rotateY = xRot*(turnMultiplier??1)*(yMultiplier??1)*(props.maxTurn??5)

    /**
     * Normalizes the mouse position relative to the 
     * element that created the event passed, storing
     * the x and y between -1 and 1.
     * @param event The event created by mouse movement
     * @returns An object which contains x and y
     */
    const getMouseNormalized = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, element: HTMLElement) => {
        const posX = event.clientX;
        const posY = event.clientY;
    
        const boundingBox = element.getBoundingClientRect();

        const boxWidth = boundingBox.width
        const boxHeight = boundingBox.height

        // Top left corner of div is zero, bottom right corner is full width and full height for pos
        // "The translation origin is North West"
        const mouseToDivX = (posX - boundingBox.x)
        const mouseToDivY = (posY - boundingBox.y)

        return {
            x: ((mouseToDivX - boxWidth/2) / boxWidth)*2,
            y: ((mouseToDivY - boxHeight/2) / boxHeight)*2,
        }
    }

    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (viewBoxDiv.current === null) return;

        const range = getMouseNormalized(e, viewBoxDiv.current)
        setXRot(range.x)
        setYRot(range.y)
    }

    const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setXRot(0)
        setYRot(0)
    }

    return (
        <div {...divProps} className={`${className??""} ${styles.viewDiv} group relative z-10 hover:z-20 transition-all`} ref={viewBoxDiv} onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler}>
            <div style={{transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}} className={`relative size-full bottom-0 group-hover:bottom-5`}>
                {children}
            </div>
        </div>
    )
}

export default Viewable3dDiv;
