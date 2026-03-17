"use client";

import { useMemo, useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import {
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PrimaryCTAButton, SecondaryCTAButton } from "@/components/ui/Buttons";

type KontaktRoutePlannerProps = {
  destination: string;
  placeUrl: string;
};

function buildDirectionsUrl(origin: string, destination: string) {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
  });

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function KontaktRoutePlanner({
  destination,
  placeUrl,
}: KontaktRoutePlannerProps) {
  const [origin, setOrigin] = useState("");

  const directionsUrl = useMemo(() => {
    return buildDirectionsUrl(origin.trim(), destination);
  }, [destination, origin]);

  const canPlanRoute = origin.trim().length > 0;

  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(5,150,105,0.12)",
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" sx={{ mb: 0.75 }}>
            Route planen
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
            Geben Sie Ihren Startpunkt ein. Die Route wird anschliessend direkt
            in Google Maps geoeffnet.
          </Typography>
        </Box>

        <TextField
          label="Ihr Startpunkt"
          placeholder="z. B. Prüm oder Bitburg"
          value={origin}
          onChange={(event) => setOrigin(event.target.value)}
          fullWidth
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Box
            component="a"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: "none",
              pointerEvents: canPlanRoute ? "auto" : "none",
            }}
          >
            <PrimaryCTAButton disabled={!canPlanRoute}>
              <Stack direction="row" spacing={1} alignItems="center">
                <NearMeOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Route starten</span>
              </Stack>
            </PrimaryCTAButton>
          </Box>

          <Box
            component="a"
            href={placeUrl}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SecondaryCTAButton>
              <Stack direction="row" spacing={1} alignItems="center">
                <RoomOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Praxis in Google Maps</span>
              </Stack>
            </SecondaryCTAButton>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
