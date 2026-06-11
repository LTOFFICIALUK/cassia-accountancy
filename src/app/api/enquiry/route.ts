import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { sendEnquiryEmails, type EnquiryPayload } from "@/lib/email";
import { checkEnquiryRateLimit } from "@/lib/rate-limit";
import { checkSpam } from "@/lib/spam-protection";

type EnquiryRequestBody = Partial<EnquiryPayload> & {
  website?: string;
  formLoadedAt?: number;
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidDateTime = (dateTimeValue: string): boolean => {
  const match = dateTimeValue.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);

  if (!match) {
    return false;
  }

  const [, yearValue, monthValue, dayValue, hourValue, minuteValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const hour = Number(hourValue);
  const minute = Number(minuteValue);
  const date = new Date(year, month - 1, day, hour, minute);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    return false;
  }

  const now = new Date();

  return date >= now;
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
      return NextResponse.json({ error: "Invalid enquiry type." }, { status: 400 });
    }

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!body.email?.trim() || !isValidEmail(body.email.trim())) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!body.services?.trim()) {
      return NextResponse.json({ error: "Please select a service." }, { status: 400 });
    }

    if (body.variant === "quote" && !body.businessType?.trim()) {
      return NextResponse.json(
        { error: "Business type is required." },
        { status: 400 },
      );
    }

    if (body.variant === "quote") {
      if (!body.preferredDateTime?.trim()) {
        return NextResponse.json(
          { error: "Preferred contact date and time is required." },
          { status: 400 },
        );
      }

      if (!isValidDateTime(body.preferredDateTime.trim())) {
        return NextResponse.json(
          { error: "Please choose a valid future date and time." },
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
      return NextResponse.json(
        {
          error:
            "You have sent several enquiries recently. Please wait a little while before trying again.",
        },
        { status: 429 },
      );
    }

    await sendEnquiryEmails(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry submission failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send your enquiry right now.",
      },
      { status: 500 },
    );
  }
};
