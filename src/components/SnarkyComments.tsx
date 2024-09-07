"use client";

import { useCallback, useState, JSX, useEffect } from "react";
import useInterval from "./hooks/useInterval";
import { randomItem } from "./libs/random";

type SnarkyCommentPropType = {} & JSX.IntrinsicElements["p"];

const loadingComments = [
    "Finding dragons",
    "Deploying agents",
    "Discovering new lands",
    "Finding opportunities",
];

const SnarkyComment = (props: SnarkyCommentPropType) => {
    const { ...paraProps } = props;

    const [comment, _setComment] = useState("Loading...");

    const setComment = useCallback((available: string[]) => {
        const newComment = randomItem(available);
        _setComment(newComment);
    }, []);

    useInterval(
        useCallback(() => {
            const uniqueCommentList = loadingComments.filter(
                (c) => c !== comment,
            );
            setComment(uniqueCommentList);
        }, [comment, setComment]),
        2000,
        () => setComment(loadingComments),
    );

    return <p {...paraProps}>{comment}</p>;
};

export default SnarkyComment;
