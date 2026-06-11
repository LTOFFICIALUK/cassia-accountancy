import { NextResponse } from "next/server";
import { sendEnquiryEmails, type EnquiryPayload } from "@/lib/email";

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidDate = (dateValue: string): boolean => {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
};

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as Partial<EnquiryPayload>;

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
      if (!body.preferredDate?.trim()) {
        return NextResponse.json(
          { error: "Preferred contact date is required." },
          { status: 400 },
        );
      }

      if (!isValidDate(body.preferredDate.trim())) {
        return NextResponse.json(
          { error: "Please choose a valid future date." },
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
      preferredDate: body.preferredDate?.trim() || undefined,
    };

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
