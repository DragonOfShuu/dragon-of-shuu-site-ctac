import { Verifier } from "./types";

export const findErrorInRegex = (
    verifiers: Verifier[],
    text: string,
): string | null =>
    verifiers.find((verifier, index) => {
        const found = text.match(verifier.regex);
        // If regex not found...
        if (found === null) {
            // Return an error
            return true;
        }
        // If this regex is the last one, and does not fully match...
        if (index === verifiers.length - 1 && found[0] !== text) {
            // Return an error
            return true;
        }
    })?.error || null;
