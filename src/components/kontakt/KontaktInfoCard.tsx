import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { practiceContact } from "@/data/contact";

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Stack direction="row" spacing={1.75} alignItems="flex-start">
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
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}>
          {label}
        </Typography>
        {children}
      </Box>
    </Stack>
  );
}

export default function KontaktInfoCard() {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 5,
        border: "1px solid rgba(5,150,105,0.12)",
        bgcolor: "background.paper",
        p: { xs: 3, md: 3.5 },
        boxShadow: "0 16px 32px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        So erreichen Sie uns
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 3.5, lineHeight: 1.7 }}>
        Nutzen Sie den direkten Kontaktweg Ihrer Wahl oder buchen Sie Ihren
        Termin online mit Datum und Uhrzeit.
      </Typography>

      <Stack spacing={3}>
        <InfoRow icon={<LocalPhoneOutlinedIcon fontSize="small" />} label="Telefon">
          <Typography component="a" href={`tel:${practiceContact.phoneHref}`} sx={{ color: "text.secondary", textDecoration: "none" }}>
            {practiceContact.phoneDisplay}
          </Typography>
        </InfoRow>

        <InfoRow icon={<EmailOutlinedIcon fontSize="small" />} label="E-Mail">
          <Typography component="a" href={`mailto:${practiceContact.email}`} sx={{ color: "text.secondary", textDecoration: "none" }}>
            {practiceContact.email}
          </Typography>
        </InfoRow>
      </Stack>

      <Divider sx={{ my: 3.5, borderColor: "rgba(5,150,105,0.1)" }} />

      <InfoRow icon={<AccessTimeOutlinedIcon fontSize="small" />} label="Oeffnungszeiten">
        <Stack spacing={0.75}>
          {practiceContact.openingHours.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ minWidth: 0 }}
            >
              <Typography sx={{ color: "text.secondary" }}>{item.label}</Typography>
              <Typography sx={{ color: "primary.dark", fontWeight: 600, textAlign: "right" }}>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </InfoRow>

      <Box
        sx={{
          mt: 3.5,
          borderRadius: 4,
          bgcolor: "rgba(5,150,105,0.06)",
          border: "1px solid rgba(5,150,105,0.1)",
          p: 2.5,
        }}
      >
        <Typography sx={{ fontWeight: 700, color: "primary.dark", mb: 0.75 }}>
          Rueckmeldung
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
          {practiceContact.responseTime}
        </Typography>
      </Box>
    </Box>
  );
}
