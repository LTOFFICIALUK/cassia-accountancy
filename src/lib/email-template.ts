import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";

const COLORS = {
  sage: "#5D6B5D",
  cream: "#F7F4EE",
  gold: "#B89B5E",
  charcoal: "#333333",
  charcoalLight: "#555555",
  border: "#E8E4DC",
  white: "#FFFFFF",
} as const;

export const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

export const formatMultilineHtml = (value: string): string => {
  return escapeHtml(value).replace(/\n/g, "<br />");
};

type EmailDetailRow = {
  label: string;
  value: string;
  multiline?: boolean;
};

const buildDetailRow = (
  { label, value, multiline = false }: EmailDetailRow,
  isLast: boolean,
): string => {
  const formattedValue = multiline ? formatMultilineHtml(value) : escapeHtml(value);
  const borderStyle = isLast ? "" : `border-bottom:1px solid ${COLORS.border};`;

  return `
    <tr>
      <td style="padding:14px 18px;${borderStyle}">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.sage};">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:${COLORS.charcoal};">
          ${formattedValue}
        </p>
      </td>
    </tr>
  `;
};

export const buildDetailsTable = (rows: EmailDetailRow[]): string => {
  if (rows.length === 0) {
    return "";
  }

  const tableRows = rows
    .map((row, index) => buildDetailRow(row, index === rows.length - 1))
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;border:1px solid ${COLORS.border};border-radius:6px;background-color:${COLORS.cream};overflow:hidden;">
      ${tableRows}
    </table>
  `;
};

const buildEmailHeader = (): string => {
  return `
    <tr>
      <td class="email-header" style="padding:28px 40px;background-color:${COLORS.white};border-bottom:3px solid ${COLORS.gold};text-align:center;">
        <a href="${SITE_URL}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
          <img
            src="${SITE_URL}/logo.png"
            alt="${SITE_NAME}"
            width="168"
            style="display:block;width:168px;max-width:100%;height:auto;margin:0 auto;border:0;"
          />
        </a>
      </td>
    </tr>
  `;
};

const buildEmailFooter = (): string => {
  const currentYear = new Date().getFullYear();

  return `
    <tr>
      <td class="email-footer" style="padding:28px 40px;background-color:${COLORS.sage};text-align:center;">
        <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;color:${COLORS.white};">
          ${SITE_NAME}
        </p>
        <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#E8EDE8;">
          Friendly accountancy for small businesses
        </p>
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;">
          <a href="mailto:${CONTACT_EMAIL}" style="color:${COLORS.white};text-decoration:none;">${CONTACT_EMAIL}</a>
        </p>
        <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;">
          <a href="tel:${CONTACT_PHONE.replace(/\s/g, "")}" style="color:${COLORS.white};text-decoration:none;">${CONTACT_PHONE}</a>
        </p>
        <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;">
          <a href="${SITE_URL}" target="_blank" rel="noopener noreferrer" style="color:${COLORS.gold};text-decoration:none;">www.cassiaaccountancy.co.uk</a>
        </p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:#C5CCC5;">
          &copy; ${currentYear} ${SITE_NAME}. All rights reserved.
        </p>
      </td>
    </tr>
  `;
};

type EmailLayoutOptions = {
  previewText: string;
  content: string;
};

export const buildEmailLayout = ({
  previewText,
  content,
}: EmailLayoutOptions): string => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(previewText)}</title>
    <!--[if mso]>
      <style type="text/css">
        body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
      </style>
    <![endif]-->
    <style>
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img {
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      @media only screen and (max-width: 620px) {
        .email-shell {
          width: 100% !important;
        }
        .email-header,
        .email-body,
        .email-footer {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        .email-body {
          padding-top: 28px !important;
          padding-bottom: 28px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.cream};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
      ${escapeHtml(previewText)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.cream};">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" class="email-shell" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${COLORS.white};">
            ${buildEmailHeader()}
            <tr>
              <td class="email-body" style="padding:36px 40px;background-color:${COLORS.white};font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${COLORS.charcoal};">
                ${content}
              </td>
            </tr>
            ${buildEmailFooter()}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const buildEmailHeading = (title: string): string => {
  return `
    <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:600;line-height:1.3;color:${COLORS.sage};">
      ${escapeHtml(title)}
    </h1>
  `;
};

export const buildEmailParagraph = (text: string): string => {
  return `
    <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${COLORS.charcoal};">
      ${text}
    </p>
  `;
};

export const buildEmailSectionTitle = (title: string): string => {
  return `
    <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.gold};">
      ${escapeHtml(title)}
    </p>
  `;
};
