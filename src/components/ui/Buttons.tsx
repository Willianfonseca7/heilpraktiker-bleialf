import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import type { PropsWithChildren } from "react";

type CTAButtonProps = PropsWithChildren<ButtonProps>;

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
