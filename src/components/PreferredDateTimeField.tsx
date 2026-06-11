"use client";

import { useEffect, useMemo, useState } from "react";
import { BrandedSelect } from "@/components/BrandedSelect";

type PreferredDateTimeFieldProps = {
  disabled?: boolean;
};

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const;

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const buildTimeOptions = () => {
  const options: { value: string; label: string }[] = [];

  for (let hour = 8; hour <= 17; hour += 1) {
    for (const minute of ["00", "30"]) {
      if (hour === 17 && minute === "30") {
        continue;
      }

      const value = `${String(hour).padStart(2, "0")}:${minute}`;
      const date = new Date(2000, 0, 1, hour, Number(minute));

      options.push({
        value,
        label: date.toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      });
    }
  }

  return options;
};

const TIME_OPTIONS = buildTimeOptions();

export const PreferredDateTimeField = ({
  disabled = false,
}: PreferredDateTimeFieldProps) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");

  const yearOptions = useMemo(
    () =>
      [currentYear, currentYear + 1].map((optionYear) => ({
        value: String(optionYear),
        label: String(optionYear),
      })),
    [currentYear],
  );

  const dayOptions = useMemo(() => {
    if (!month || !year) {
      return Array.from({ length: 31 }, (_, index) => {
        const value = String(index + 1).padStart(2, "0");

        return {
          value,
          label: String(index + 1),
        };
      });
    }

    const daysInMonth = getDaysInMonth(Number(year), Number(month));

    return Array.from({ length: daysInMonth }, (_, index) => {
      const value = String(index + 1).padStart(2, "0");

      return {
        value,
        label: String(index + 1),
      };
    });
  }, [month, year]);

  const preferredDateTime =
    day && month && year && time ? `${year}-${month}-${day}T${time}` : "";

  useEffect(() => {
    if (!day || !month || !year) {
      return;
    }

    const daysInMonth = getDaysInMonth(Number(year), Number(month));

    if (Number(day) > daysInMonth) {
      setDay(String(daysInMonth).padStart(2, "0"));
    }
  }, [day, month, year]);

  return (
    <div>
      <input
        type="hidden"
        name="preferredDateTime"
        value={preferredDateTime}
        required
        disabled={disabled}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <span className="sr-only">Day</span>
          <BrandedSelect
            id="preferredDay"
            name="preferredDay"
            options={dayOptions}
            placeholder="Day"
            required
            disabled={disabled}
            value={day}
            onChange={setDay}
            ariaLabel="Preferred contact day"
          />
        </div>

        <div>
          <span className="sr-only">Month</span>
          <BrandedSelect
            name="preferredMonth"
            options={MONTHS}
            placeholder="Month"
            required
            disabled={disabled}
            value={month}
            onChange={setMonth}
            ariaLabel="Preferred contact month"
          />
        </div>

        <div>
          <span className="sr-only">Year</span>
          <BrandedSelect
            name="preferredYear"
            options={yearOptions}
            placeholder="Year"
            required
            disabled={disabled}
            value={year}
            onChange={setYear}
            ariaLabel="Preferred contact year"
          />
        </div>
      </div>

      <div className="mt-3">
        <span className="sr-only">Time</span>
        <BrandedSelect
          name="preferredTime"
          options={TIME_OPTIONS}
          placeholder="Select a time"
          required
          disabled={disabled}
          value={time}
          onChange={setTime}
          ariaLabel="Preferred contact time"
        />
      </div>

      <p className="mt-2 text-xs text-charcoal-light">
        Choose when you would like us to get in touch about your quote.
      </p>
    </div>
  );
};
