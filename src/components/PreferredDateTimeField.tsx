"use client";

import { useEffect, useMemo, useState } from "react";
import { BrandedSelect } from "@/components/BrandedSelect";

type PreferredDateTimeFieldProps = {
  disabled?: boolean;
  error?: string | null;
  onClearError?: () => void;
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

const getSelectableYears = (year: number, month: number): number[] => {
  const isDecember = month === 11;

  return isDecember ? [year, year + 1] : [year];
};

const isSameCalendarDay = (left: Date, right: Date): boolean => {
  return left.toDateString() === right.toDateString();
};

export const PreferredDateTimeField = ({
  disabled = false,
  error = null,
  onClearError,
}: PreferredDateTimeFieldProps) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentMonthIndex = now.getMonth();
  const currentDay = now.getDate();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");

  const yearOptions = useMemo(
    () =>
      getSelectableYears(currentYear, currentMonthIndex).map((optionYear) => ({
        value: String(optionYear),
        label: String(optionYear),
      })),
    [currentYear, currentMonthIndex],
  );

  const monthOptions = useMemo(() => {
    const selectedYear = year ? Number(year) : currentYear;

    return MONTHS.filter((option) => {
      if (selectedYear > currentYear) {
        return true;
      }

      return Number(option.value) >= currentMonth;
    });
  }, [year, currentYear, currentMonth]);

  const dayOptions = useMemo(() => {
    if (!month || !year) {
      return [];
    }

    const selectedYear = Number(year);
    const selectedMonth = Number(month);
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const minimumDay =
      selectedYear === currentYear && selectedMonth === currentMonth
        ? currentDay
        : 1;

    return Array.from({ length: daysInMonth }, (_, index) => {
      const dayNumber = index + 1;

      if (dayNumber < minimumDay) {
        return null;
      }

      const value = String(dayNumber).padStart(2, "0");

      return {
        value,
        label: String(dayNumber),
      };
    }).filter(Boolean) as { value: string; label: string }[];
  }, [month, year, currentYear, currentMonth, currentDay]);

  const timeOptions = useMemo(() => {
    if (!day || !month || !year) {
      return TIME_OPTIONS;
    }

    const selectedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    if (!isSameCalendarDay(selectedDate, new Date())) {
      return TIME_OPTIONS;
    }

    const currentMoment = new Date();

    return TIME_OPTIONS.filter((option) => {
      const [hourValue, minuteValue] = option.value.split(":");
      const slotDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hourValue),
        Number(minuteValue),
      );

      return slotDate >= currentMoment;
    });
  }, [day, month, year]);

  const preferredDateTime =
    day && month && year && time ? `${year}-${month}-${day}T${time}` : "";

  const noTimesAvailableToday =
    Boolean(day && month && year) &&
    timeOptions.length === 0 &&
    isSameCalendarDay(
      new Date(Number(year), Number(month) - 1, Number(day)),
      now,
    );

  const handleDayChange = (value: string) => {
    setDay(value);
    onClearError?.();
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    onClearError?.();
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    onClearError?.();
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    onClearError?.();
  };

  useEffect(() => {
    if (month && !monthOptions.some((option) => option.value === month)) {
      setMonth("");
    }
  }, [month, monthOptions]);

  useEffect(() => {
    if (day && !dayOptions.some((option) => option.value === day)) {
      setDay("");
    }
  }, [day, dayOptions]);

  useEffect(() => {
    if (time && !timeOptions.some((option) => option.value === time)) {
      setTime("");
    }
  }, [time, timeOptions]);

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

      <div
        className={`grid gap-3 sm:grid-cols-3 ${
          error ? "rounded-md ring-2 ring-red-200" : ""
        }`}
      >
        <div>
          <span className="sr-only">Month</span>
          <BrandedSelect
            name="preferredMonth"
            options={monthOptions}
            placeholder="Month"
            required
            disabled={disabled}
            value={month}
            onChange={handleMonthChange}
            ariaLabel="Preferred contact month"
            hasError={Boolean(error)}
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
            onChange={handleYearChange}
            ariaLabel="Preferred contact year"
            hasError={Boolean(error)}
          />
        </div>

        <div>
          <span className="sr-only">Day</span>
          <BrandedSelect
            id="preferredDay"
            name="preferredDay"
            options={dayOptions}
            placeholder={month && year ? "Day" : "Choose month first"}
            required
            disabled={disabled || !month || !year}
            value={day}
            onChange={handleDayChange}
            ariaLabel="Preferred contact day"
            hasError={Boolean(error)}
          />
        </div>
      </div>

      <div className="mt-3">
        <span className="sr-only">Time</span>
        <BrandedSelect
          name="preferredTime"
          options={timeOptions}
          placeholder={
            noTimesAvailableToday ? "No times left today" : "Select a time"
          }
          required
          disabled={disabled || noTimesAvailableToday}
          value={time}
          onChange={handleTimeChange}
          ariaLabel="Preferred contact time"
          hasError={Boolean(error)}
        />
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : noTimesAvailableToday ? (
        <p className="mt-2 text-sm text-charcoal-light">
          There are no appointment times left today. Please choose another day.
        </p>
      ) : (
        <p className="mt-2 text-xs text-charcoal-light">
          Choose a date and time from today onwards. We are available Monday to
          Friday, 8am to 5pm.
        </p>
      )}
    </div>
  );
};
