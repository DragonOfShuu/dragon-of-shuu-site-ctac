"use client";

import useEpicRow from "@/components/epicForms/contexts/EpicFormRowContext";
import SpecialButton from "@/components/SpecialButton";
import { DetailedHTMLProps, TextareaHTMLAttributes, useState } from "react";
import Markdown from "react-markdown";

export type MarkdownTextboxPropType = {
    charmax: number;
} & DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

const MarkdownTextbox = (props: MarkdownTextboxPropType) => {
    const [textAreaText, _setTextAreaText] = useState<string>("");
    const { className, ...textareaProps } = props;
    const [isMarkdown, setMarkdown] = useState(true);
    const { setFormError } = useEpicRow();

    const setTextAreaText = (newValue: string) => {
        _setTextAreaText(newValue);
        const currTextLength = newValue.length;
        return setFormError(
            currTextLength > props.charmax
                ? `Text length exceeds character limit (${props.charmax} limit)`
                : null,
        );
    };

    return (
        <div className={`flex flex-col gap-2`}>
            <textarea
                {...textareaProps}
                className={`w-full h-48 ${isMarkdown ? `` : `hidden`}`}
                onChange={(e) => setTextAreaText(e.target.value)}
            />
            {/* Create a reusable class named "docs" that allows you to have margins beneath headings, etc */}
            <Markdown
                className={`w-full h-48 overflow-y-scroll ${isMarkdown ? `hidden` : ``}`}
            >
                {textAreaText}
            </Markdown>
            <div className={`flex gap-2`}>
                <p
                    className={`ml-1 text-orange-800 italic font-sans`}
                >{`Markdown Enabled. ${props.charmax} char limit.`}</p>
                <div className="grow" />
                <SpecialButton
                    notProminent={!isMarkdown}
                    type={`button`}
                    onClick={() => setMarkdown(true)}
                >
                    Markdown
                </SpecialButton>
                <SpecialButton
                    notProminent={isMarkdown}
                    type={`button`}
                    onClick={() => setMarkdown(false)}
                >
                    Preview
                </SpecialButton>
            </div>
        </div>
    );
};

export default MarkdownTextbox;
