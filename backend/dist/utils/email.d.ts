interface ContactEmailData {
    name: string;
    email: string;
    phone?: string;
    country_of_interest?: string;
    message: string;
    inquiry_id: number;
}
export declare const sendContactEmail: (data: ContactEmailData) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const sendConfirmationEmail: (data: ContactEmailData) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const sendStudentApplicationEmail: (studentData: any) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
declare const _default: {
    sendContactEmail: (data: ContactEmailData) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendConfirmationEmail: (data: ContactEmailData) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendStudentApplicationEmail: (studentData: any) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
};
export default _default;
//# sourceMappingURL=email.d.ts.map