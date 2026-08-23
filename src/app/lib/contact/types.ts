export type ContactSubmissionType = {
    name: string;
    message: string;
    ret_addr: string;
};

export const contactSubmissionKeys: (keyof ContactSubmissionType)[] = [
    "name",
    "message",
    "ret_addr",
];

export const contactSubmissionDisplay: {
    [x in keyof ContactSubmissionType]: string;
} = {
    name: "Name",
    message: "Message",
    ret_addr: "Return Address",
};
