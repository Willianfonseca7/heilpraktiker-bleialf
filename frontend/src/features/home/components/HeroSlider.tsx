import { useState } from "react";
import { Box, Chip, Stack } from "@mui/material";
import { useInterval } from "../../../hooks/useInterval.ts";

type Slide = {
  key: string;
  label: string;
  image: string;
};

export function HeroSlider({ intervalMs = 6000 }: { intervalMs?: number }) {
  const slides: Slide[] = [
    { key: "akupunktur", label: "Akupunktur & TCM", image: "/hero/acumpuntua.jpg" },
    { key: "psychotherapie", label: "Psychotherapie", image: "/hero/pinscicologie.jpg" },
    { key: "lerntherapie", label: "Pädagogik & Lerntherapie", image: "/hero/kindertherapie.jpg" },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useInterval(
    () => {
      setActive((prev) => (prev + 1) % slides.length);
    },
    paused ? null : intervalMs
  );

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        position: "relative",
        height: { xs: 260, md: 420 },
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.key}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === active ? 1 : 0,
            transition: "opacity 900ms ease",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)",
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {slides.map((slide, index) => (
          <Chip
            key={slide.key}
            label={slide.label}
            onClick={() => setActive(index)}
            clickable
            color={index === active ? "primary" : "default"}
            variant={index === active ? "filled" : "outlined"}
            sx={{
              bgcolor: index === active ? "primary.main" : "rgba(255,255,255,0.9)",
              color: index === active ? "white" : "text.primary",
              borderColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(6px)",
            }}
          />
        ))}
      </Stack>

      <Box
        sx={{
          position: "absolute",
          bottom: 14,
          left: 16,
          display: "flex",
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActive(index)}
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              cursor: "pointer",
              bgcolor: index === active ? "primary.main" : "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
