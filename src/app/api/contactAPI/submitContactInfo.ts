"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
    contactSubmissionKeys,
    ContactSubmissionType,
} from "../../lib/contact/types";
import { findErrorInRegex } from "@/app/lib/userVerification/findErrorInRegex";
import {
    messageLengthVerifier,
    nameVerifier,
} from "@/app/lib/contact/verifications";

const verifyContactInfo = (
    data: Partial<ContactSubmissionType>,
): string | null => {
    if (!data.name || !data.message || !data.ret_addr) {
        return "Missing required fields";
    }
    const nameError = findErrorInRegex(nameVerifier, data.name);
    if (nameError) return nameError;
    const messageError =
        data.message.length > messageLengthVerifier
            ? "Message is too long"
            : null;
    if (messageError) return messageError;
    const retAddrError = findErrorInRegex(nameVerifier, data.ret_addr);
    if (retAddrError) return retAddrError;
    return null;
};

const submitContactInfo = async (
    formData: FormData,
): Promise<{ message: string }> => {
    console.log("Form data received server-side:", formData);
    const headersList = headers();
    console.log("Request headers:", (await headersList).entries());
    const rawFormData = contactSubmissionKeys.reduce<
        Partial<ContactSubmissionType>
    >((prev, curr) => {
        // Some may call this lazy. I call it ✨fashionable✨
        prev[curr] = (formData.get(curr) ?? undefined) as string | undefined;
        return prev;
    }, {});

    const verificationError = verifyContactInfo(rawFormData);
    if (verificationError) {
        console.error("Verification error:", verificationError);
        return { message: verificationError };
    }

    const redirURL = `/contact/thank-you/?${new URLSearchParams(rawFormData)}`;

    redirect(redirURL);
};

export { submitContactInfo };
