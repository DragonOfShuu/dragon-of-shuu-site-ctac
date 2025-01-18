"use client";

import { useState, useEffect, useCallback } from "react";
import { encrypt, decrypt } from "@/app/projects/endcrypt/encryptionDecryption";
import styles from "./endcrypt.module.sass";
import SpecialButton from "@/components/SpecialButton";
import copyText from "@/clientlibs/copyToClipboard";

const Translations = () => {
    const [toEncrypt, setToEncrypt] = useState<boolean>(true);
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [key, setKey] = useState<string>("0000");
    const [tempKey, setTempKey] = useState<string>("0000");

    const formatKey = (newKey: string): string => {
        let returnableKey: string = "";
        for (let i = 0; i < 4; i++) {
            let char = newKey[i];
            if (!isNaN(Number(char))) returnableKey += char;
            else returnableKey += "0";
        }
        return returnableKey;
    };

    useEffect(() => {
        if (toEncrypt) setOutput(encrypt(input, key));
        else setOutput(decrypt(input, key));
    }, [input, toEncrypt, key]);

    const clearText = useCallback(() => {
        setOutput("");
        setInput("");
    }, []);

    const switchText = useCallback(() => {
        setInput(output);
        setToEncrypt(!toEncrypt);
    }, [output, toEncrypt]);

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            // Alt Keys
            if (event.altKey) {
                if (event.code == "KeyC") clearText();
                else if (event.code == "KeyS") switchText();
                else if (event.code == "KeyT") setToEncrypt(!toEncrypt);
            }
        };

        window.addEventListener("keydown", keydown);

        return () => {
            window.removeEventListener("keydown", keydown);
        };
    }, [toEncrypt, clearText, switchText]);

    useEffect(() => setKey(formatKey(tempKey)), [tempKey]);

    return (
        <div
            className={`${styles.translations} w-full lg:w-auto md:w-auto [&>textarea]:input-box`}
        >
            <div className="flex flex-row gap-5 items-center w-full">
                <SpecialButton onClick={() => setToEncrypt(!toEncrypt)}>
                    {toEncrypt ? "Encrypt" : "Decrypt"} Mode
                </SpecialButton>
                <div className={`flex-grow`} />
                <div className={`flex flex-row items-stretch gap-1`}>
                    <p className={`self-center`}>key:</p>
                    <input
                        type="number"
                        onChange={(event) => setTempKey(event.target.value)}
                        onBlur={() => setTempKey(formatKey(tempKey))}
                        value={tempKey}
                        min={1}
                        max={9999}
                        title="Key for Encryption"
                        className={`input-box`}
                    />
                </div>
            </div>

            <textarea
                className={styles.input}
                placeholder="Input..."
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />

            <div className={styles.executionButtons}>
                <SpecialButton onClick={switchText}>Switch</SpecialButton>
                <SpecialButton onClick={clearText}>Clear</SpecialButton>
                <SpecialButton onClick={() => copyText(output)}>
                    Copy
                </SpecialButton>
            </div>

            <textarea
                className={styles.output}
                placeholder="Output..."
                onChange={(event) => setOutput(event.target.value)}
                value={output}
                readOnly
            />
        </div>
    );
};

export default Translations;
