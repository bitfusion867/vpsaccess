import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const WELCOME_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID!;
const PURCHASE_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_PURCHASE_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export async function sendEmail({
                                    to,
                                    name,
                                    type,
                                    product,
                                }: {
    to: string;
    name: string;
    type: "welcome" | "purchase";
    product?: string;
}) {
    try {
        const templateId =
            type === "welcome" ? WELCOME_TEMPLATE_ID : PURCHASE_TEMPLATE_ID;

        const templateParams = {
            name,
            email: to,
            product: product || "VPS Access",
        };

        const res = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);

        return {success: true, res};
    } catch (error) {
        console.error("EmailJS Error:", error);
        return {success: false, error};
    }
}
