"use client";

import { useEffect, useRef } from "react";
import BaseDialog from "../BaseDialog";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Markdown from "react-markdown";
import styles from "./BaseHelp.module.sass"
import Question from "./../assets/circle-question";

type Props = {

}

const firstTimeName: string = 'FASTESTPATHER_isFirstTime'

const HowOnStart = () => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(()=> {
        let data = localStorage.getItem(firstTimeName)
        if (data!==null) return

        dialogRef.current?.showModal()
        localStorage.setItem(firstTimeName, 'false');
    }, [])

    return (
        <>
            <Question 
                scale={20} 
                className={`w-12 h-12 fixed top-20 left-2 cursor-pointer hover:fill-white`} 
                onClick={()=>dialogRef.current?.showModal()} />

            <BaseDialog dialogRef={dialogRef} className={`w-1/2`}>
                <div className="overflow-y-scroll max-h-[600px] w-full flex flex-col">
                    <Markdown className={`${styles.markdownStyles}`}>
                        {readme}
                    </Markdown>
                    <button onClick={()=>dialogRef.current?.close()} className={`self-center`}>
                        Thanks!
                    </button>
                </div>
            </BaseDialog>
        </>
    )
}

const readme = `
# Welcome to Fastest Pather!

This mini allows you to create your own
environment, and run the A* Search 
Algorithm inside of it!

You can draw many types of tiles to
run the pather through. At this time,
you can draw asphalt, grass, mud, and
water. As well as those, you can also
draw barriers by drawing with the same
paint type as the paint you are drawing
on top of.

You can think of this program almost
like Google Maps, except you don't have
to rely on the real world; you can
create your own environment for Google
Maps to try to find the fastest path
through.

If at any point you are stuck, just 
press the question mark that will show
up on each and every page of the program.
They will go through in detail each 
button, and how things work.

If you have any issues with this program,
you can message me on my instagram
\`@logan.of.shuu\`, or on my discord
\`@dragonofshuu\`.

If you want to see this dialog again,
just press the question mark in the
up top most corner!
`

export default HowOnStart;