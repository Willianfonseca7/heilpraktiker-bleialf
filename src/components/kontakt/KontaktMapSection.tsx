import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import KontaktRoutePlanner from "@/components/kontakt/KontaktRoutePlanner";
import { SecondaryCTAButton } from "@/components/ui/Buttons";
import { practiceContact } from "@/data/contact";

type KontaktMapSectionProps = {
  title?: string;
  subtitle?: string;
};

export default function KontaktMapSection({
  title = "So finden Sie zu uns",
  subtitle = "Sehen Sie die Lage unserer Praxis auf einen Blick und planen Sie Ihre Anfahrt mit wenigen Klicks.",
}: KontaktMapSectionProps) {
  return (
    <Box
      sx={{
        borderRadius: 5,
        border: "1px solid rgba(5,150,105,0.12)",
        background:
          "linear-gradient(135deg, rgba(248,252,249,0.98) 0%, rgba(239,248,242,0.98) 52%, rgba(233,244,237,0.98) 100%)",
        p: { xs: 3, md: 4 },
        boxShadow: "0 16px 32px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0,1.1fr) minmax(340px,0.9fr)",
          },
          alignItems: "stretch",
        }}
      >
        <Box>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                {subtitle}
              </Typography>
            </Box>

            <Box
              sx={{
                overflow: "hidden",
                borderRadius: 4,
                border: "1px solid rgba(5,150,105,0.12)",
                bgcolor: "rgba(255,255,255,0.7)",
                minHeight: { xs: 320, md: 380 },
              }}
            >
              <Box
                component="iframe"
                title="Standort der Praxis"
                src={practiceContact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 320, md: 380 },
                }}
              />
            </Box>
          </Stack>
        </Box>

        <Stack spacing={2.5}>
          <Box
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(5,150,105,0.12)",
              p: { xs: 2.5, md: 3 },
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
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
                <RoomOutlinedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: "primary.dark", mb: 0.5 }}>
                  Praxisstandort
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  {practiceContact.addressLines.join(", ")}
                </Typography>
              </Box>
            </Stack>

            <Box
              component="a"
              href={practiceContact.mapsPlaceUrl}
              target="_blank"
              rel="noreferrer"
              sx={{ mt: 2.5, textDecoration: "none" }}
            >
              <SecondaryCTAButton>
                <Stack direction="row" spacing={1} alignItems="center">
                  <OpenInNewOutlinedIcon sx={{ fontSize: 18 }} />
                  <span>Standort in Google Maps</span>
                </Stack>
              </SecondaryCTAButton>
            </Box>
          </Box>

          <KontaktRoutePlanner
            destination={practiceContact.routeDestination}
            placeUrl={practiceContact.mapsPlaceUrl}
          />
        </Stack>
      </Box>
    </Box>
  );
}
