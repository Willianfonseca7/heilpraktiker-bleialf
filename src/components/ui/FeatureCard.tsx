"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import type { FeatureCardItem } from "../../types/home";
import { fallbackImage } from "../../lib/images";

type FeatureCardProps = FeatureCardItem;

export function FeatureCard({ title, image, items, href, buttonLabel }: FeatureCardProps) {
  const isLink = Boolean(href);

  return (
    <Box
      component={isLink ? Link : "div"}
      href={isLink ? href : undefined}
      sx={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "grid",
        gridTemplateRows: "180px 1fr",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
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
            display: "block",
          }}
        />
      </Box>
      <Box sx={{ p: 3, display: "grid", gap: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
          {title}
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2, color: "text.secondary" }}>
          {items.map((item) => (
            <Box component="li" key={item} sx={{ mb: 0.5 }}>
              {item}
            </Box>
          ))}
        </Box>
        {buttonLabel && (
          <Button variant="text" color="primary" sx={{ justifySelf: "start", fontWeight: 700, px: 0 }} component="span">
            {buttonLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
