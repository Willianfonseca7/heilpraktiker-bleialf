import { SimplePage } from "../../../features/pages/SimplePage";
import { Typography } from "@mui/material";

export default function DisclaimerPage() {
  return (
    <SimplePage
      title="Disclaimer"
      subtitle="Hinweise zur Nutzung"
      intro="Diese Website informiert ueber das Heilpraktiker-Zentrum Bleialf, seine Leistungen und die Moeglichkeit zur digitalen Termin- und Kontaktanfrage."
    >
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Die Inhalte dienen der allgemeinen Information und ersetzen keine
        individuelle medizinische, therapeutische oder rechtliche Beratung.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Vor dem finalen Deploy wird dieser Bereich bei Bedarf um weitere
        Nutzungshinweise und rechtliche Klarstellungen ergaenzt.
      </Typography>
    </SimplePage>
  );
}
