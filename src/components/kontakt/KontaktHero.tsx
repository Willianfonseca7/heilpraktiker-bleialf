import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import AppointmentPrimaryCTAButton from "@/components/appointments/AppointmentPrimaryCTAButton";
import { SecondaryCTAButton } from "@/components/ui/Buttons";
import { practiceContact } from "@/data/contact";

const quickFacts = [
  "Persoenliche Begleitung",
  "Terminwahl mit Uhrzeit",
  "Rueckmeldung innerhalb von 24 Stunden",
];

export default function KontaktHero() {
  return (
    <Box
      sx={{
        borderRadius: 6,
        border: "1px solid rgba(5, 150, 105, 0.12)",
        background:
          "linear-gradient(135deg, rgba(247,252,248,0.98) 0%, rgba(237,247,241,0.98) 48%, rgba(231,243,235,0.98) 100%)",
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 5 },
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 5 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0,1.45fr) minmax(360px,1fr)" },
          alignItems: "center",
        }}
      >
        <Box>
          <Stack spacing={2.5}>
            <Typography
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                color: "primary.main",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              Kontakt
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.4rem", md: "3.4rem" },
                lineHeight: 1.02,
                maxWidth: 760,
              }}
            >
              Kontaktieren Sie uns fuer Terminwunsch, Rueckfragen oder ein
              persoenliches Erstgespraech.
            </Typography>

            <Typography
              sx={{
                maxWidth: 680,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.75,
              }}
            >
              Ob Sie bereits wissen, welche Behandlung Sie buchen moechten, oder
              erst Orientierung suchen: Wir begleiten Sie gerne persoenlich und
              unkompliziert.
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1.25}>
              {quickFacts.map((fact) => (
                <Chip
                  key={fact}
                  label={fact}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.7)",
                    color: "primary.dark",
                    border: "1px solid rgba(5,150,105,0.12)",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <AppointmentPrimaryCTAButton
                defaultTreatment="Akupunktur"
                preferredTreatments={[
                  "Akupunktur",
                  "Psychotherapie",
                  "Lerntherapeutisches Training",
                ]}
              />
              <SecondaryCTAButton component={Link} href="/gesundheits-check">
                Gesundheits-Check starten
              </SecondaryCTAButton>
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Stack spacing={2}>
            {[
              {
                icon: <CalendarMonthOutlinedIcon fontSize="small" />,
                title: "Termin online buchen",
                description:
                  "Waehlen Sie Behandlung, Datum und Uhrzeit direkt online.",
              },
              {
                icon: <EmailOutlinedIcon fontSize="small" />,
                title: practiceContact.email,
                description:
                  "Schreiben Sie uns Ihr Anliegen. Wir melden uns zeitnah zurueck.",
              },
              {
                icon: <LocalPhoneOutlinedIcon fontSize="small" />,
                title: practiceContact.phoneDisplay,
                description:
                  "Fuer direkte Rueckfragen sind wir telefonisch erreichbar.",
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(5,150,105,0.12)",
                  p: 2.5,
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.04)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      bgcolor: "rgba(5,150,105,0.12)",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
