"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
    contactSubmissionKeys,
    ContactSubmissionType,
} from "@/app/contact/contactTypes";

const submitContactInfo = async (formData: FormData) => {
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

    const redirURL = `/contact/thank-you/?${new URLSearchParams(rawFormData)}`;

    redirect(redirURL);
};

export { submitContactInfo };
