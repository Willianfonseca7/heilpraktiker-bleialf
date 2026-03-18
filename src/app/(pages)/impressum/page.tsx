import { SimplePage } from "../../../features/pages/SimplePage";
import { Typography } from "@mui/material";

export default function ImpressumPage() {
  return (
    <SimplePage
      title="Impressum"
      subtitle="Rechtliche Angaben"
      intro="Hier finden Sie die gesetzlich erforderlichen Angaben zum Heilpraktiker-Zentrum Bleialf sowie die Kontaktdaten der verantwortlichen Stelle."
    >
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Die vollstaendigen Impressumsangaben werden vor dem finalen Deploy mit
        den verbindlichen Daten der Praxis, der verantwortlichen Person sowie
        den rechtlich erforderlichen Kontaktinformationen vervollstaendigt.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Bis dahin dient diese Seite als strukturierter Platzhalter innerhalb des
        oeffentlichen Webauftritts.
      </Typography>
    </SimplePage>
  );
}
