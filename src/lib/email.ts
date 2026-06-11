import { Resend } from "resend";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? `${SITE_NAME} <hello@cassiaaccountancy.co.uk>`;

export type EnquiryPayload = {
  variant: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  services: string;
  message?: string;
  preferredDate?: string;
};

export const formatPreferredDate = (dateValue: string): string => {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const buildEnquiryDetails = (payload: EnquiryPayload): string => {
  const lines = [
    `<strong>Name:</strong> ${payload.name}`,
    payload.businessName
      ? `<strong>Business Name:</strong> ${payload.businessName}`
      : null,
    payload.businessType
      ? `<strong>Business Type:</strong> ${payload.businessType}`
      : null,
    `<strong>Email:</strong> ${payload.email}`,
    payload.phone ? `<strong>Phone:</strong> ${payload.phone}` : null,
    `<strong>Services:</strong> ${payload.services}`,
    payload.preferredDate
      ? `<strong>Preferred Contact Date:</strong> ${formatPreferredDate(payload.preferredDate)}`
      : null,
    payload.message
      ? `<strong>${payload.variant === "quote" ? "About Their Needs" : "Message"}:</strong><br />${payload.message.replace(/\n/g, "<br />")}`
      : null,
  ].filter(Boolean);

  return lines.join("<br /><br />");
};

const buildOwnerEmail = (payload: EnquiryPayload) => {
  const isQuote = payload.variant === "quote";

  return {
    subject: isQuote
      ? `New quote request from ${payload.name}`
      : `New contact enquiry from ${payload.name}`,
    html: `
      <p>You have received a new ${isQuote ? "quote request" : "contact enquiry"} from your website.</p>
      <p>${buildEnquiryDetails(payload)}</p>
      <p>Reply directly to ${payload.email} to follow up.</p>
    `,
  };
};

const buildCustomerEmail = (payload: EnquiryPayload) => {
  const isQuote = payload.variant === "quote";
  const preferredDateLine = payload.preferredDate
    ? `<p>Your preferred contact date is <strong>${formatPreferredDate(payload.preferredDate)}</strong>. We will do our best to get in touch around this time.</p>`
    : "";

  return {
    subject: isQuote
      ? "We've received your quote request"
      : "We've received your enquiry",
    html: `
      <p>Hi ${payload.name},</p>
      <p>Thank you for getting in touch with ${SITE_NAME}.</p>
      <p>${
        isQuote
          ? "We have received your quote request and will review your details before sending a personalised quote, usually within one working day."
          : "We have received your message and will be in touch shortly to arrange your free discovery call."
      }</p>
      ${preferredDateLine}
      <p><strong>Summary of your enquiry:</strong></p>
      <p>${buildEnquiryDetails(payload)}</p>
      <p>If anything looks incorrect, reply to this email and we will update your enquiry.</p>
      <p>Kind regards,<br />${SITE_NAME}</p>
    `,
  };
};

export const sendEnquiryEmails = async (
  payload: EnquiryPayload,
): Promise<void> => {
  if (!resend) {
    throw new Error("Email service is not configured.");
  }

  const ownerEmail = buildOwnerEmail(payload);
  const customerEmail = buildCustomerEmail(payload);

  const [ownerResult, customerResult] = await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: payload.email,
      subject: ownerEmail.subject,
      html: ownerEmail.html,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      replyTo: CONTACT_EMAIL,
      subject: customerEmail.subject,
      html: customerEmail.html,
    }),
  ]);

  if (ownerResult.error || customerResult.error) {
    throw new Error(
      ownerResult.error?.message ??
        customerResult.error?.message ??
        "Failed to send enquiry emails.",
    );
  }
};
