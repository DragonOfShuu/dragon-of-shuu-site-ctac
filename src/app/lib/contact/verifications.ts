export const nameVerifier = [
    {
        error: `Must include at least a first and last name`,
        regex: /\w+\s\w+/,
    },
    {
        error: `Cannot include numbers`,
        regex: /\w+\s*/,
    },
    {
        error: `First, middle, surname, and last name acceptable only. Use hyphens otherwise`,
        regex: /\w{1,50}( [\w-]{1,50}){1,3}/,
    },
];

export const messageLengthVerifier = 1000;

const emailAddrRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const emailAddressVerifier = [
    {
        error: `Missing '@' symbol`,
        regex: /\@/,
    },
    {
        error: `Missing proper domain name (e.g.: gmail.com)`,
        regex: /.+@.+\..+/,
    },
    {
        error: `Must be a valid email address (must also be all lowercase)`,
        regex: emailAddrRegex,
    },
    {
        error: `Email address cannot be longer than 256 characters`,
        regex: new RegExp(`.{1,256}`),
    },
];
