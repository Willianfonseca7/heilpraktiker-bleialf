"use client";

import { useMemo, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Alert,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import { createContactMessage } from "@/lib/contact-messages-api";
import { SecondaryCTAButton } from "@/components/ui/Buttons";

export default function KontaktMessageForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      message.trim()
    );
  }, [email, firstName, lastName, message]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!canSubmit) {
      setError("Bitte fuellen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Bitte geben Sie eine gueltige E-Mail-Adresse ein.");
      return;
    }

    setSubmitting(true);

    try {
      await createContactMessage({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSuccess("Ihre Nachricht wurde erfolgreich gesendet.");
      toast.success("Ihre Nachricht wurde erfolgreich gespeichert.");
    } catch (submitError) {
      const nextMessage =
        submitError instanceof Error
          ? submitError.message
          : "Nachricht konnte nicht gesendet werden.";
      setError(nextMessage);
      toast.error(nextMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        border: "1px solid rgba(5,150,105,0.12)",
        bgcolor: "background.paper",
        p: { xs: 3, md: 3.5 },
        boxShadow: "0 16px 32px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "rgba(5,150,105,0.12)",
            color: "primary.main",
          }}
        >
          <EmailOutlinedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="h4">Ihre Nachricht an uns</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Senden Sie uns Ihr Anliegen direkt ueber das Formular. Ihre
            Nachricht wird im Backend gespeichert und kann vom Team bearbeitet
            werden.
          </Typography>
        </Box>
      </Stack>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack spacing={2.25}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2.25}>
            <TextField
              label="Vorname"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Nachname"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              fullWidth
              required
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2.25}>
            <TextField
              label="E-Mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Telefon (optional)"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              fullWidth
            />
          </Stack>

          <TextField
            label="Nachricht"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            multiline
            minRows={6}
            fullWidth
            required
          />

          {error ? <Alert severity="error">{error}</Alert> : null}
          {success ? <Alert severity="success">{success}</Alert> : null}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Typography sx={{ color: "text.secondary", maxWidth: 420 }}>
              Wenn Sie bereits wissen, welche Behandlung Sie buchen moechten,
              nutzen Sie bevorzugt den direkten Online-Termin.
            </Typography>
            <SecondaryCTAButton
              component="button"
              type="submit"
              disabled={!canSubmit || submitting}
              sx={{ px: 3 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <SendRoundedIcon sx={{ fontSize: 18 }} />
                <span>{submitting ? "Wird gesendet..." : "Nachricht senden"}</span>
              </Stack>
            </SecondaryCTAButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
