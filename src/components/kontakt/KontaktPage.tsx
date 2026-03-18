import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import KontaktHero from "@/components/kontakt/KontaktHero";
import KontaktInfoCard from "@/components/kontakt/KontaktInfoCard";
import KontaktMapSection from "@/components/kontakt/KontaktMapSection";
import KontaktMessageForm from "@/components/kontakt/KontaktMessageForm";
import { PrimaryCTAButton, SecondaryCTAButton } from "@/components/ui/Buttons";
import { PageContainer } from "@/components/ui/PageContainer";
import { Section } from "@/components/ui/Section";

const supportCards = [
  {
    title: "Termin online buchen",
    text: "Waehlen Sie Behandlung, Datum und Uhrzeit direkt online. Ihre Anfrage wird danach vom Team bestaetigt.",
    action: (
      <PrimaryCTAButton component={Link} href="/behandlungen">
        Zu den Behandlungen
      </PrimaryCTAButton>
    ),
  },
  {
    title: "Per E-Mail anfragen",
    text: "Ideal fuer Rueckfragen, Organisatorisches oder wenn Sie uns Ihr Anliegen erst kurz schildern moechten.",
    action: (
      <SecondaryCTAButton component="a" href="mailto:kontakt@heilpraktiker-zentrum-bleialf.de">
        E-Mail schreiben
      </SecondaryCTAButton>
    ),
  },
  {
    title: "Gesundheits-Check starten",
    text: "Wenn Sie noch unsicher sind, welche Behandlung zu Ihnen passt, fuehrt Sie der Check schnell zur passenden Empfehlung.",
    action: (
      <SecondaryCTAButton component={Link} href="/gesundheits-check">
        Check starten
      </SecondaryCTAButton>
    ),
  },
];

export default function KontaktPage() {
  return (
    <PageContainer py={{ xs: 5, md: 8 }}>
      <Stack spacing={{ xs: 5, md: 7 }}>
        <KontaktHero />

        <Section
          title="Wie duerfen wir Ihnen helfen?"
          subtitle="Waehlen Sie den schnellsten Weg fuer Ihr Anliegen. So wirkt die Seite zugleich persoenlich und handlungsstark."
          mt={0}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >
            {supportCards.map((card) => (
              <Box key={card.title}>
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    border: "1px solid rgba(5,150,105,0.12)",
                    p: 3,
                    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.045)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 1.25 }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mb: 3 }}>
                    {card.text}
                  </Typography>
                  {card.action}
                </Box>
              </Box>
            ))}
          </Box>
        </Section>

        <Box
          sx={{
            display: "grid",
            gap: 3.5,
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(300px,0.95fr) minmax(0,1.35fr)",
            },
            alignItems: "stretch",
          }}
        >
          <Box>
            <KontaktInfoCard />
          </Box>
          <Box>
            <KontaktMessageForm />
          </Box>
        </Box>

        <KontaktMapSection />
      </Stack>
    </PageContainer>
  );
}
