"use client";

import { convertFromRune, convertToRune } from "@/app/minis/runes/runeTables";
import SpecialButton from "@/components/SpecialButton";
import { useEffect, useState } from "react";
import styles from "./runes.module.sass"
import copyText from "@/libs/copyToClipboard";
import Question from "@/app/minis/runes/Question";

const Translations = () => {
    const [toRune, setToRune] = useState(true);
    const [isAssumption, setAssumption] = useState(true);
    
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const [disclaimerV, setDisclaimerV] = useState(false);

    function switchText() {
        let newInput: string;
        
        if (toRune) newInput = output;
        else {
            // Always assume when switching, we don't want
            // square brackets in the input box
            newInput = convertFromRune(input, true)
        }
        
        setToRune(!toRune)
        setInput(newInput);
    }

    function clearText() {
        setInput("");
        setOutput("");
    }
    
    useEffect(() => {
        let theOutput;
        if (toRune) {
            theOutput = convertToRune(input)
        } else {
            theOutput = convertFromRune(input, isAssumption)
        }

        setOutput(theOutput)
    }, [input, isAssumption, toRune]);

    return (
        <div
            className={`${styles.translations} w-full lg:w-auto md:w-auto`}>

            <div className="flex flex-row gap-5 items-center w-full">
                <SpecialButton onClick={() => setToRune(!toRune)}>
                    {
                        toRune ? "Rune" : "Decrypt"
                    } Mode
                </SpecialButton>
                <SpecialButton
                    onClick={() => setAssumption(!isAssumption)}
                    className={`${toRune?"invisible":"visible"}`}>
                    {
                        isAssumption ? "Assumption" : "Exact"
                    }
                </SpecialButton>
            </div>

            <textarea
                className={styles.input}
                placeholder='Input...'
                onChange={(event) => setInput(event.target.value)}
                value={input} />

            <div className={styles.executionButtons}>
                <SpecialButton onClick={switchText}>Switch</SpecialButton>
                <SpecialButton onClick={clearText}>Clear</SpecialButton>
                <SpecialButton onClick={()=>copyText(output)}>Copy</SpecialButton>
            </div>

            <textarea
                className={styles.output}
                placeholder='Output...'
                onChange={(event) => setOutput(event.target.value)}
                value={output}
                readOnly />

            <div className={`flex flex-row gap-2 items-center`}>
                <div title='Please note that some latin characters share the same runic character'>
                    <Question scale={20} className={`hover:fill-white cursor-pointer`} onClick={()=> setDisclaimerV(!disclaimerV)} />
                </div>
                <p className={`text-xs md:text-base transition-all select-none ${disclaimerV?"opacity-100":"opacity-0"}`}>{`Please note that some latin characters share the same runic character`}</p>
            </div>
        </div>
    )
}

export default Translations;
