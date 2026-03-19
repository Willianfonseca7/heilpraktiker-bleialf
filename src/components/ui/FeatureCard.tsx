"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import type { FeatureCardItem } from "../../types/home";
import { fallbackImage } from "../../lib/images";
import { getTreatmentCardHref } from "@/lib/treatment-links";

type FeatureCardProps = FeatureCardItem;

export function FeatureCard({
  title,
  image,
  items,
  href,
  buttonLabel,
  imageObjectPosition,
}: FeatureCardProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "rgba(5,150,105,0.12)",
        bgcolor: "background.paper",
        display: "grid",
        gridTemplateRows: "180px 1fr",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.04)",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(5,150,105,0.22)",
          boxShadow: "0 16px 30px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <Box sx={{ width: "100%", height: 180, overflow: "hidden" }}>
        <Box
          component="img"
          src={image}
          alt={title}
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src !== fallbackImage) {
              target.src = fallbackImage;
            }
          }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: imageObjectPosition ?? "center",
            display: "block",
          }}
        />
      </Box>
      <Box sx={{ p: 3, display: "grid", gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.dark", mb: 1 }}>
          {title}
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2, color: "text.secondary" }}>
          {items.map((item) => (
            <Box component="li" key={item} sx={{ mb: 0.5 }}>
              {getTreatmentCardHref(item) ? (
                <Box
                  component={Link}
                  href={getTreatmentCardHref(item) ?? "#"}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "color 180ms ease, border-color 180ms ease",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "rgba(5,150,105,0.35)",
                    },
                  }}
                >
                  {item}
                </Box>
              ) : (
                item
              )}
            </Box>
          ))}
        </Box>
        {buttonLabel && (
          href ? (
            <Button
              variant="text"
              color="primary"
              sx={{ justifySelf: "start", fontWeight: 700, px: 0 }}
              component={Link}
              href={href}
            >
              {buttonLabel}
            </Button>
          ) : (
            <Button
              variant="text"
              color="primary"
              sx={{ justifySelf: "start", fontWeight: 700, px: 0 }}
              component="span"
            >
              {buttonLabel}
            </Button>
          )
        )}
      </Box>
    </Box>
  );
}
