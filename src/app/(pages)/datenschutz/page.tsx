import { SimplePage } from "../../../features/pages/SimplePage";
import { Typography } from "@mui/material";

export default function DatenschutzPage() {
  return (
    <SimplePage
      title="Datenschutz"
      subtitle="Sicherheit und Vertrauen"
      intro="Der Schutz Ihrer personenbezogenen Daten hat fuer uns einen hohen Stellenwert. Auf dieser Seite werden die datenschutzrelevanten Informationen der Praxis gebuendelt bereitgestellt."
    >
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Die endgueltige Datenschutzerklaerung wird vor dem Deploy mit allen
        produktiven Angaben zu Hosting, Cookies, Formularen, Benutzerkonten und
        Terminanfragen vervollstaendigt.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        Ziel ist eine transparente Darstellung aller Datenverarbeitungen im
        oeffentlichen Bereich sowie in den geschuetzten Benutzer- und
        Verwaltungsbereichen.
      </Typography>
    </SimplePage>
  );
}
