export function toDate(value: string | Date) {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateTime(
  value: string | Date,
  options?: Intl.DateTimeFormatOptions
) {
  const date = toDate(value);

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }).format(date);
}

export function formatAppointmentDateTime(value: string | Date) {
  return formatDateTime(value, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
