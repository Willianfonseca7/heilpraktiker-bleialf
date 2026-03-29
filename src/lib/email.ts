type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  return {
    apiKey,
    from,
    enabled: Boolean(apiKey && from),
  };
}

async function sendEmail(payload: EmailPayload) {
  const config = getEmailConfig();

  if (!config.enabled) {
    console.warn("Email delivery skipped: RESEND_API_KEY or EMAIL_FROM is missing.");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      errorBody || `Email delivery failed with status ${response.status}.`
    );
  }

  return true;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatAppointmentDate(value: Date | string | null | undefined) {
  if (!value) return "Noch nicht festgelegt";

  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function sendRegistrationEmail(params: {
  to: string;
  firstName: string;
  lastName: string;
}) {
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const safeFirstName = escapeHtml(params.firstName);
  const safeFullName = escapeHtml(fullName);

  return sendEmail({
    to: params.to,
    subject: "Willkommen im Heilpraktiker-Zentrum Bleialf",
    text: [
      `Hallo ${fullName},`,
      "",
      "vielen Dank für Ihre Registrierung im Heilpraktiker-Zentrum Bleialf.",
      "Sie können sich ab sofort anmelden, Ihren Gesundheits-Check durchführen und Termine online anfragen.",
      "",
      "Mit freundlichen Grüßen",
      "Heilpraktiker-Zentrum Bleialf",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#16352a">
        <h2 style="margin:0 0 16px;color:#065f46">Willkommen, ${safeFirstName}</h2>
        <p>Vielen Dank für Ihre Registrierung im Heilpraktiker-Zentrum Bleialf.</p>
        <p>Ihr Konto für <strong>${safeFullName}</strong> ist jetzt aktiv. Sie können sich anmelden, Ihren Gesundheits-Check durchführen und Termine online anfragen.</p>
        <p style="margin-top:24px">Mit freundlichen Grüßen<br />Heilpraktiker-Zentrum Bleialf</p>
      </div>
    `,
  });
}

export async function sendLoginSuccessEmail(params: {
  to: string;
  firstName: string;
  lastName: string;
}) {
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const safeFirstName = escapeHtml(params.firstName);
  const safeFullName = escapeHtml(fullName);

  return sendEmail({
    to: params.to,
    subject: "Anmeldung erfolgreich",
    text: [
      `Hallo ${fullName},`,
      "",
      "Sie haben sich erfolgreich im Heilpraktiker-Zentrum Bleialf angemeldet.",
      "Sie koennen jetzt Ihren Gesundheits-Check aufrufen, Ergebnisse einsehen und Termine online anfragen.",
      "",
      "Mit freundlichen Grüßen",
      "Heilpraktiker-Zentrum Bleialf",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#16352a">
        <h2 style="margin:0 0 16px;color:#065f46">Anmeldung erfolgreich</h2>
        <p>Hallo ${safeFirstName},</p>
        <p>Sie haben sich erfolgreich im Heilpraktiker-Zentrum Bleialf angemeldet.</p>
        <p>Ihr Konto für <strong>${safeFullName}</strong> ist aktiv. Sie koennen jetzt Ihren Gesundheits-Check aufrufen, Ergebnisse einsehen und Termine online anfragen.</p>
        <p style="margin-top:24px">Mit freundlichen Grüßen<br />Heilpraktiker-Zentrum Bleialf</p>
      </div>
    `,
  });
}

export async function sendAppointmentRequestReceivedEmail(params: {
  to: string;
  firstName: string;
  treatment: string;
  doctor?: string | null;
  scheduledAt?: Date | string | null;
}) {
  const safeFirstName = escapeHtml(params.firstName);
  const safeTreatment = escapeHtml(params.treatment);
  const safeDoctor = escapeHtml(params.doctor || "Wird passend zugewiesen");
  const scheduledLabel = formatAppointmentDate(params.scheduledAt);
  const safeScheduledLabel = escapeHtml(scheduledLabel);

  return sendEmail({
    to: params.to,
    subject: "Ihre Terminanfrage ist eingegangen",
    text: [
      `Hallo ${params.firstName},`,
      "",
      "vielen Dank. Ihre Terminanfrage wurde erfolgreich an uns uebermittelt.",
      `Behandlung: ${params.treatment}`,
      `Behandler: ${params.doctor || "Wird passend zugewiesen"}`,
      `Wunschtermin: ${scheduledLabel}`,
      "",
      "Unser Team prueft Ihre Anfrage und meldet sich mit einer Bestaetigung oder Rueckmeldung.",
      "",
      "Mit freundlichen Grüßen",
      "Heilpraktiker-Zentrum Bleialf",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#16352a">
        <h2 style="margin:0 0 16px;color:#065f46">Terminanfrage eingegangen</h2>
        <p>Hallo ${safeFirstName},</p>
        <p>vielen Dank. Ihre Terminanfrage wurde erfolgreich an uns uebermittelt.</p>
        <div style="margin:20px 0;padding:16px;border:1px solid #d1fae5;border-radius:14px;background:#f0fdf4">
          <p style="margin:0 0 8px"><strong>Behandlung:</strong> ${safeTreatment}</p>
          <p style="margin:0 0 8px"><strong>Behandler:</strong> ${safeDoctor}</p>
          <p style="margin:0"><strong>Wunschtermin:</strong> ${safeScheduledLabel}</p>
        </div>
        <p>Unser Team prueft Ihre Anfrage und meldet sich mit einer Bestaetigung oder Rueckmeldung.</p>
        <p style="margin-top:24px">Mit freundlichen Grüßen<br />Heilpraktiker-Zentrum Bleialf</p>
      </div>
    `,
  });
}

export async function sendAppointmentStatusEmail(params: {
  to: string;
  firstName: string;
  treatment: string;
  doctor?: string | null;
  scheduledAt?: Date | string | null;
  status: "CONFIRMED" | "CANCELED";
}) {
  const safeFirstName = escapeHtml(params.firstName);
  const safeTreatment = escapeHtml(params.treatment);
  const safeDoctor = escapeHtml(params.doctor || "Wird vor Ort abgestimmt");
  const scheduledLabel = formatAppointmentDate(params.scheduledAt);
  const safeScheduledLabel = escapeHtml(scheduledLabel);

  const accepted = params.status === "CONFIRMED";
  const subject = accepted
    ? "Ihr Termin wurde bestätigt"
    : "Update zu Ihrer Terminanfrage";

  const intro = accepted
    ? "Ihre Terminanfrage wurde bestätigt."
    : "Ihre Terminanfrage wurde leider abgelehnt.";

  return sendEmail({
    to: params.to,
    subject,
    text: [
      `Hallo ${params.firstName},`,
      "",
      intro,
      `Behandlung: ${params.treatment}`,
      `Behandler: ${params.doctor || "Wird vor Ort abgestimmt"}`,
      `Termin: ${scheduledLabel}`,
      "",
      accepted
        ? "Sie finden die Aktualisierung auch in Ihrem Bereich Mein Konto."
        : "Bitte schauen Sie in Ihrem Bereich Mein Konto für weitere Details oder fragen Sie einen neuen Termin an.",
      "",
      "Mit freundlichen Grüßen",
      "Heilpraktiker-Zentrum Bleialf",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#16352a">
        <h2 style="margin:0 0 16px;color:#065f46">${accepted ? "Termin bestätigt" : "Update zu Ihrer Anfrage"}</h2>
        <p>Hallo ${safeFirstName},</p>
        <p>${escapeHtml(intro)}</p>
        <div style="margin:20px 0;padding:16px;border:1px solid #d1fae5;border-radius:14px;background:#f0fdf4">
          <p style="margin:0 0 8px"><strong>Behandlung:</strong> ${safeTreatment}</p>
          <p style="margin:0 0 8px"><strong>Behandler:</strong> ${safeDoctor}</p>
          <p style="margin:0"><strong>Termin:</strong> ${safeScheduledLabel}</p>
        </div>
        <p>${
          accepted
            ? "Sie finden die Aktualisierung auch in Ihrem Bereich <strong>Mein Konto</strong>."
            : "Bitte schauen Sie in Ihrem Bereich <strong>Mein Konto</strong> für weitere Details oder fragen Sie einen neuen Termin an."
        }</p>
        <p style="margin-top:24px">Mit freundlichen Grüßen<br />Heilpraktiker-Zentrum Bleialf</p>
      </div>
    `,
  });
}
