export type EnquiryField =
  | "name"
  | "email"
  | "services"
  | "businessType"
  | "preferredDateTime";

export type EnquiryErrorResponse = {
  error: string;
  field?: EnquiryField;
};

export const ENQUIRY_ERRORS = {
  invalidType: {
    error: "Something went wrong with your enquiry. Please refresh the page and try again.",
  },
  nameRequired: {
    error: "Please enter your name.",
    field: "name",
  },
  emailRequired: {
    error: "Please enter a valid email address so we can get back to you.",
    field: "email",
  },
  serviceRequired: {
    error: "Please select the service you are interested in.",
    field: "services",
  },
  businessTypeRequired: {
    error: "Please tell us what type of business you run.",
    field: "businessType",
  },
  preferredDateTimeRequired: {
    error: "Please choose a date and time for us to call you.",
    field: "preferredDateTime",
  },
  rateLimited: {
    error:
      "You have sent a few enquiries recently. Please wait a little while before trying again, or email us directly at hello@cassiaaccountancy.co.uk.",
  },
  sendFailed: {
    error:
      "We could not send your enquiry just now. Please try again in a moment, or email us at hello@cassiaaccountancy.co.uk.",
  },
} satisfies Record<string, EnquiryErrorResponse>;
