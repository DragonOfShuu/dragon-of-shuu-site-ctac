export type ContactSubmissionType = {
    name: string,
    message: string,
    ret_addr: string,
}

export const contactSubmissionKeys: (keyof ContactSubmissionType)[] = [
    'name',
    'message',
    'ret_addr'
]