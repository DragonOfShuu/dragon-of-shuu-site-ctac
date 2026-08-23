"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
    contactSubmissionKeys,
    ContactSubmissionType,
} from "../../lib/contact/types";
import { findErrorInRegex } from "@/app/lib/userVerification/findErrorInRegex";
import {
    emailAddressVerifier,
    messageLengthVerifier,
    nameVerifier,
} from "@/app/lib/contact/verifications";
import sql from "../sql";

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
    const retAddrError = findErrorInRegex(emailAddressVerifier, data.ret_addr);
    if (retAddrError) return retAddrError;
    return null;
};

function getFormData(formData: FormData) {
    return contactSubmissionKeys.reduce<Partial<ContactSubmissionType>>(
        (prev, curr) => {
            // Some may call this lazy. I call it ✨fashionable✨
            prev[curr] = (formData.get(curr) ?? undefined) as
                | string
                | undefined;
            return prev;
        },
        {},
    );
}

const uploadSubmissionData = async (
    data: ContactSubmissionType,
    headers: Headers,
) => {
    // Log the submission data
    console.log("Contact submission received:", data);
    const query = await sql`
        INSERT INTO contacts 
        (name, message, return_address, headers) VALUES (
            ${data.name}, ${data.message}, 
            ${data.ret_addr}, ${JSON.stringify(
                Object.fromEntries(headers.entries()),
            )}
        )`;
};

const submitContactInfo = async (
    formData: FormData,
): Promise<{ message: string }> => {
    console.log("Form data received server-side:", formData);
    const rawFormData = getFormData(formData);

    const verificationError = verifyContactInfo(rawFormData);
    if (verificationError) {
        console.error("Verification error:", verificationError);
        return { message: verificationError };
    }

    const submissionData: ContactSubmissionType =
        rawFormData as ContactSubmissionType;

    const headersList = await headers();
    await uploadSubmissionData(submissionData, headersList);

    const redirURL = `/contact/thank-you/?${new URLSearchParams(rawFormData)}`;

    redirect(redirURL);
};

export { submitContactInfo };
