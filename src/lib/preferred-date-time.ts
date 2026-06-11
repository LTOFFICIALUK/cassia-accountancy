export const parsePreferredDateTime = (value: string): Date | null => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);

  if (!match) {
    return null;
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
    return null;
  }

  return date;
};

export const isPreferredDateTimeInFuture = (value: string): boolean => {
  const date = parsePreferredDateTime(value);

  if (!date) {
    return false;
  }

  return date >= new Date();
};

export const getPreferredDateTimeError = (value?: string): string | null => {
  if (!value?.trim()) {
    return "Please choose a date and time for us to call you.";
  }

  const date = parsePreferredDateTime(value.trim());

  if (!date) {
    return "Please complete all parts of your preferred date and time.";
  }

  const now = new Date();

  if (date >= now) {
    return null;
  }

  if (date.toDateString() === now.toDateString()) {
    return "That time has already passed today. Please choose a later time or another day.";
  }

  return "That date has already passed. Please choose a date from today onwards.";
};
