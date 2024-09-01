"use client";

import {
    contactSubmissionDisplay,
    contactSubmissionKeys,
    ContactSubmissionType,
} from "@/app/contact/contactTypes";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import styles from "./SubmissionViewer.module.sass";
import Markdown from "react-markdown";

type SubmissionViewerPropType = {};

const SubmissionViewer = (props: SubmissionViewerPropType) => {
    const params = useSearchParams();

    const submitted: { [x: string]: string | undefined } = useMemo(
        () =>
            contactSubmissionKeys.reduce<{ [x: string]: string | undefined }>(
                (kv, key) => {
                    const value = params.get(key) ?? undefined;
                    kv[contactSubmissionDisplay[key]] = value;
                    return kv;
                },
                {},
            ),
        [params],
    );

    return (
        <div className={`${styles.viewer}`}>
            {Object.entries(submitted).map(([key, value], ind) => (
                <div className={`${styles.dataBox}`} key={ind}>
                    <h3 className={styles.key}>{key}</h3>
                    <Markdown className={styles.value}>{value}</Markdown>
                </div>
            ))}
        </div>
    );
};

export default SubmissionViewer;
