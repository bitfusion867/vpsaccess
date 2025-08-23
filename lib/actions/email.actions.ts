"use server";

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
                                    to,
                                    subject,
                                    html,
                                }: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const data = await resend.emails.send({
            from: "noreply@vpsaccess.org", // make sure this domain is verified in Resend
            to,
            subject,
            html,
        });

        return {success: true, data};
    } catch (error: any) {
        console.error("Resend error:", error);
        return {success: false, error};
    }
}
