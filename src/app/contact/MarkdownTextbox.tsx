"use client";

import SpecialButton from "@/components/SpecialButton";
import { DetailedHTMLProps, TextareaHTMLAttributes, useState } from "react";
import Markdown from "react-markdown";

export type MarkdownTextboxPropType = {} & DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

const MarkdownTextbox = (props: MarkdownTextboxPropType) => {
    const [textAreaText, setTextAreaText] = useState<string>("");
    const { className, ...textareaProps } = props;
    const [isMarkdown, setMarkdown] = useState(true);

    return (
        <div className={`flex flex-col gap-2`}>
            <textarea
                {...textareaProps}
                className={`w-full h-48 ${isMarkdown ? `` : `hidden`}`}
                onChange={(e) => setTextAreaText(e.target.value)}
            />
            <Markdown
                className={`w-full h-48 overflow-y-scroll ${isMarkdown ? `hidden` : ``}`}
            >
                {textAreaText}
            </Markdown>
            <div className={`flex gap-2`}>
                <p
                    className={`ml-1 text-orange-800 italic font-sans`}
                >{`Markdown Enabled`}</p>
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
