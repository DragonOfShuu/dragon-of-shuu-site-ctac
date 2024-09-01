"use client";

import { contactSubmissionKeys, ContactSubmissionType } from "@/app/contact/contactTypes";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import styles from './SubmissionViewer.module.sass'
import Markdown from "react-markdown";

type SubmissionViewerPropType = {

}

const SubmissionViewer = (props: SubmissionViewerPropType) => {
    const params = useSearchParams();

    const submitted: ContactSubmissionType = useMemo(() => (
        contactSubmissionKeys.reduce<Partial<ContactSubmissionType>>((kv, key) => {
            const value = params.get(key)??undefined;
            kv[key] = value
            return kv;
        }, {}) as ContactSubmissionType
    ), [params])

    return (
        <div className={`${styles.viewer}`}>
            {
                Object.entries(submitted).map(([key, value], ind) => (
                    <div className={`${styles.dataBox}`} key={ind}>
                        <h3 className={styles.key}>{key}</h3>
                        <Markdown className={styles.value}>
                            {value}
                        </Markdown>
                    </div>
                ))
            }
        </div>
    )
}

export default SubmissionViewer;
