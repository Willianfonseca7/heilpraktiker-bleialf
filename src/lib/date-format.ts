export function toDate(value: string | Date) {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateTime(
  value: string | Date,
  options?: Intl.DateTimeFormatOptions
) {
  const date = toDate(value);
  const usesPresetStyles =
    typeof options?.dateStyle !== "undefined" ||
    typeof options?.timeStyle !== "undefined";

  return new Intl.DateTimeFormat("de-DE", {
    ...(usesPresetStyles
      ? {}
      : {
          day: "2-digit" as const,
          month: "2-digit" as const,
          year: "numeric" as const,
          hour: "2-digit" as const,
          minute: "2-digit" as const,
        }),
    ...options,
  }).format(date);
}

export function formatAppointmentDateTime(value: string | Date) {
  return formatDateTime(value, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
