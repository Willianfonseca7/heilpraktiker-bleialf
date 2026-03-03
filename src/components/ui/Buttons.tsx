"use client";

import { Button } from "@mui/material";
import type { ElementType, PropsWithChildren } from "react";

type CTAButtonProps = PropsWithChildren<{
  onClick?: () => void;
  href?: string;
  to?: string;
  component?: ElementType;
}>;

export function PrimaryCTAButton({ children, ...rest }: CTAButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{ borderRadius: 999, px: 3 }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export function SecondaryCTAButton({ children, ...rest }: CTAButtonProps) {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      sx={{ borderRadius: 999, px: 3 }}
      {...rest}
    >
      {children}
    </Button>
  );
}
