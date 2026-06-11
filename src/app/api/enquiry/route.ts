import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { ENQUIRY_ERRORS } from "@/lib/enquiry-errors";
import { sendEnquiryEmails, type EnquiryPayload } from "@/lib/email";
import {
  getPreferredDateTimeError,
} from "@/lib/preferred-date-time";
import { checkEnquiryRateLimit } from "@/lib/rate-limit";
import { checkSpam } from "@/lib/spam-protection";

type EnquiryRequestBody = Partial<EnquiryPayload> & {
  website?: string;
  formLoadedAt?: number;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as EnquiryRequestBody;

    const spamCheck = checkSpam({
      website: body.website,
      formLoadedAt: body.formLoadedAt,
      name: body.name?.trim() ?? "",
      email: body.email?.trim() ?? "",
      message: body.message?.trim(),
    });

    if (spamCheck.blocked) {
      return NextResponse.json({ success: true });
    }

    if (!body.variant || !["contact", "quote"].includes(body.variant)) {
      return NextResponse.json(ENQUIRY_ERRORS.invalidType, { status: 400 });
    }

    if (!body.name?.trim()) {
      return NextResponse.json(ENQUIRY_ERRORS.nameRequired, { status: 400 });
    }

    if (!body.email?.trim() || !isValidEmail(body.email.trim())) {
      return NextResponse.json(ENQUIRY_ERRORS.emailRequired, { status: 400 });
    }

    if (!body.services?.trim()) {
      return NextResponse.json(ENQUIRY_ERRORS.serviceRequired, { status: 400 });
    }

    if (body.variant === "quote" && !body.businessType?.trim()) {
      return NextResponse.json(ENQUIRY_ERRORS.businessTypeRequired, {
        status: 400,
      });
    }

    if (body.variant === "quote") {
      const preferredDateTimeError = getPreferredDateTimeError(
        body.preferredDateTime,
      );

      if (preferredDateTimeError) {
        return NextResponse.json(
          {
            error: preferredDateTimeError,
            field: "preferredDateTime" as const,
          },
          { status: 400 },
        );
      }
    }

    const payload: EnquiryPayload = {
      variant: body.variant,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || undefined,
      businessName: body.businessName?.trim() || undefined,
      businessType: body.businessType?.trim() || undefined,
      services: body.services.trim(),
      message: body.message?.trim() || undefined,
      preferredDateTime: body.preferredDateTime?.trim() || undefined,
    };

    const clientIp = getClientIp(request);
    const rateLimit = await checkEnquiryRateLimit(clientIp, payload.email);

    if (!rateLimit.success) {
      return NextResponse.json(ENQUIRY_ERRORS.rateLimited, { status: 429 });
    }

    await sendEnquiryEmails(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry submission failed:", error);

    return NextResponse.json(ENQUIRY_ERRORS.sendFailed, { status: 500 });
  }
};
