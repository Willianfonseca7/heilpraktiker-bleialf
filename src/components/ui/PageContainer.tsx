"use client";

import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";

type PageContainerProps = PropsWithChildren<{
  py?: { xs: number; md: number } | number;
}>;

export function PageContainer({ children, py = { xs: 6, md: 10 } }: PageContainerProps) {
  return <Container sx={{ py }}>{children}</Container>;
}
