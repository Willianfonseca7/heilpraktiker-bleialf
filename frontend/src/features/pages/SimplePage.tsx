import { Typography } from "@mui/material";
import { PageContainer } from "../../components/ui/PageContainer.tsx";

export function SimplePage({ title }: { title: string }) {
  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={800}>
        {title}
      </Typography>
    </PageContainer>
  );
}
