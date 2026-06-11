import { Resend } from "resend";
import {
  buildDetailsTable,
  buildEmailHeading,
  buildEmailLayout,
  buildEmailParagraph,
  buildEmailSectionTitle,
  escapeHtml,
} from "@/lib/email-template";
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
  preferredDateTime?: string;
};

export const formatPreferredDateTime = (dateTimeValue: string): string => {
  const [datePart, timePart] = dateTimeValue.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const date = new Date(year, month - 1, day, hour, minute);

  return date.toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const buildEnquiryDetailRows = (payload: EnquiryPayload) => {
  return [
    { label: "Name", value: payload.name },
    payload.businessName
      ? { label: "Business Name", value: payload.businessName }
      : null,
    payload.businessType
      ? { label: "Business Type", value: payload.businessType }
      : null,
    { label: "Email", value: payload.email },
    payload.phone ? { label: "Phone", value: payload.phone } : null,
    { label: "Services", value: payload.services },
    payload.preferredDateTime
      ? {
          label: "Preferred Contact Date & Time",
          value: formatPreferredDateTime(payload.preferredDateTime),
        }
      : null,
    payload.message
      ? {
          label: payload.variant === "quote" ? "About Their Needs" : "Message",
          value: payload.message,
          multiline: true,
        }
      : null,
  ].filter(Boolean) as {
    label: string;
    value: string;
    multiline?: boolean;
  }[];
};

const buildOwnerEmail = (payload: EnquiryPayload) => {
  const isQuote = payload.variant === "quote";
  const title = isQuote ? "New quote request" : "New contact enquiry";
  const intro = isQuote
    ? "You have received a new quote request from your website."
    : "You have received a new contact enquiry from your website.";

  const content = [
    buildEmailHeading(title),
    buildEmailParagraph(intro),
    buildEmailSectionTitle("Enquiry details"),
    buildDetailsTable(buildEnquiryDetailRows(payload)),
    buildEmailParagraph(
      `Reply directly to <a href="mailto:${escapeHtml(payload.email)}" style="color:#5D6B5D;text-decoration:underline;">${escapeHtml(payload.email)}</a> to follow up.`,
    ),
  ].join("");

  return {
    subject: isQuote
      ? `New quote request from ${payload.name}`
      : `New contact enquiry from ${payload.name}`,
    html: buildEmailLayout({
      previewText: intro,
      content,
    }),
  };
};

const buildCustomerEmail = (payload: EnquiryPayload) => {
  const isQuote = payload.variant === "quote";
  const subject = isQuote
    ? "We've received your quote request"
    : "We've received your enquiry";
  const greeting = buildEmailParagraph(
    `Hi ${escapeHtml(payload.name)},`,
  );
  const thankYou = buildEmailParagraph(
    `Thank you for getting in touch with ${SITE_NAME}.`,
  );
  const confirmation = buildEmailParagraph(
    isQuote
      ? "We have received your quote request and will review your details before sending a personalised quote, usually within one working day."
      : "We have received your message and will be in touch shortly to arrange your free discovery call.",
  );
  const preferredDateTimeLine = payload.preferredDateTime
    ? buildEmailParagraph(
        `Your preferred contact date and time is <strong style="color:#333333;">${escapeHtml(formatPreferredDateTime(payload.preferredDateTime))}</strong>. We will do our best to get in touch around this time.`,
      )
    : "";
  const summary = [
    buildEmailSectionTitle("Summary of your enquiry"),
    buildDetailsTable(buildEnquiryDetailRows(payload)),
  ].join("");
  const closing = buildEmailParagraph(
    "If anything looks incorrect, simply reply to this email and we will update your enquiry.",
  );
  const signOff = buildEmailParagraph(
    `Kind regards,<br /><strong style="color:#5D6B5D;">${SITE_NAME}</strong>`,
  );

  const content = [
    greeting,
    thankYou,
    confirmation,
    preferredDateTimeLine,
    summary,
    closing,
    signOff,
  ]
    .filter(Boolean)
    .join("");

  return {
    subject,
    html: buildEmailLayout({
      previewText: isQuote
        ? "Thanks for your quote request. We will be in touch shortly."
        : "Thanks for your enquiry. We will be in touch shortly.",
      content,
    }),
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
