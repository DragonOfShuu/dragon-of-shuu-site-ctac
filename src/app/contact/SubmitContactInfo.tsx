"use server";

import { redirect } from "next/navigation";
import {
    contactSubmissionKeys,
    ContactSubmissionType,
} from "@/app/contact/contactTypes";
import sendMail from "../../../emails";
import InboundContact from "../../../emails/InboundContact";

const submitContactInfo = async (formData: FormData) => {
    const rawFormData = contactSubmissionKeys.reduce<
        Partial<ContactSubmissionType>
    >((prev, curr) => {
        // Some may call this lazy. I call it ✨fashionable✨
        prev[curr] = (formData.get(curr) ?? undefined) as string | undefined;
        return prev;
    }, {});

    console.log("Emailing data (and more!)", rawFormData);

    // Unnecessary; mailing intercepts mail in dev
    // if (process.env.NODE_ENV==='production')
    sendMail({
        to: "contact@dragonofshuu.dev",
        component: (
            <InboundContact
                contactee={rawFormData.name ?? ""}
                retAddress={rawFormData.ret_addr ?? ""}
                textContent={rawFormData.message ?? ""}
            />
        ),
    });

    const redirURL = `/contact/thank-you/?${new URLSearchParams(rawFormData)}`;

    redirect(redirURL);
};

export { submitContactInfo };
