import { Box, Typography } from "@mui/material";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import Link from "next/link";
import { HeroSlider } from "./components/HeroSlider";
import { PageContainer } from "../../components/ui/PageContainer";
import { Section } from "../../components/ui/Section";
import { FeatureCard } from "../../components/ui/FeatureCard";
import { SecondaryCTAButton } from "../../components/ui/Buttons";
import AppointmentPrimaryCTAButton from "@/components/appointments/AppointmentPrimaryCTAButton";
import VNSSection from "@/components/home/VNSSection";
import { homeFeatureCards, homeHeroSlides } from "../../config/homeContent";

const heroGridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
  gap: 4,
  alignItems: "center",
} as const;

const objectiveWrapperSx = {
  mt: { xs: 8, md: 12 },
  display: "flex",
  justifyContent: "center",
} as const;

const sectionSpacingSx = {
  xs: 8,
  md: 12,
} as const;

const objectiveCardSx = {
  bgcolor: "rgba(5,150,105,0.06)",
  color: "text.primary",
  p: { xs: 3, md: 6 },
  maxWidth: 900,
  border: "1px solid",
  borderColor: "rgba(5,150,105,0.16)",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.03)",
  position: "relative",
  overflow: "hidden",
} as const;

const objectiveDecorationTopSx = {
  position: "absolute",
  right: -28,
  top: -28,
  width: 120,
  height: 120,
  borderRadius: "50%",
  border: "1px solid rgba(5,150,105,0.12)",
} as const;

const objectiveDecorationBottomSx = {
  position: "absolute",
  right: 24,
  bottom: -40,
  width: 160,
  height: 160,
  borderRadius: "50%",
  border: "1px solid rgba(5,150,105,0.08)",
} as const;

export function Home() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <PageContainer>
        <Box sx={heroGridSx}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.05 }}>
              Herzlich Willkommen im Heilpraktiker - Zentrum in Bleialf
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary", maxWidth: 720 }}>
              Akupunktur, Psychotherapie und Lerntherapie – interdisziplinär, individuell und menschlich.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
              <AppointmentPrimaryCTAButton
                defaultTreatment="Akupunktur"
                preferredTreatments={["Akupunktur", "Psychotherapie", "Lerntherapeutisches Training"]}
              />
              <SecondaryCTAButton component={Link} href="/team">
                Unser Team
              </SecondaryCTAButton>
            </Box>
          </Box>

          <HeroSlider slides={homeHeroSlides} />
        </Box>

        <Box id="health-check" sx={objectiveWrapperSx}>
          <Box sx={objectiveCardSx}>
            <Box aria-hidden sx={objectiveDecorationTopSx} />
            <Box aria-hidden sx={objectiveDecorationBottomSx} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.dark" }}>
              Unser Ziel ist es, möglichst lange gesund und aktiv zu leben!
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(22,53,42,0.8)" }}>
              Um dieses Ziel der Gesunderhaltung zu erreichen, ist eine vorsorgliche Diagnostik
              vonnöten. Wenn wir vorsorglich, in dem hochkomplexen System Mensch, Abweichungen von
              der Norm entdecken und dann beeinflussen, können wir vielfach Gesundheit erhalten.
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(22,53,42,0.8)" }}>
              Eine frühest mögliche Therapie basiert immer auf einer frühest möglichen Diagnostik.
              Diese Diagnostik sollte den Menschen von den verschiedensten Ebenen aus betrachten um
              Informationen über einen Zustand finden zu können, bevor Strukturschäden (Defekte)
              sich entwickelt haben.
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(22,53,42,0.8)" }}>
              Deshalb sind wir ein Team von motivierten Therapeuten, aus den verschiedensten
              Bereichen, welches engagiert versucht unser Konzept für Ihre Gesunderhaltung
              umzusetzen.
            </Typography>

            <Typography sx={{ mt: 3, color: "rgba(6,95,70,0.86)", fontWeight: 500 }}>
              Mit freundlichen Grüßen
              <br />
              Johannes Willems
            </Typography>
          </Box>
        </Box>

        <Section title="Unsere Schwerpunkte" mt={sectionSpacingSx}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 3,
            }}
          >
            {homeFeatureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </Box>
        </Section>

        <Box sx={{ mt: sectionSpacingSx }}>
          <VNSSection />
        </Box>

        <Section title="Schmerzfrei ohne Medikamente?" mt={sectionSpacingSx}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/r9Lxn4KzII0"
                title="Schmerzfrei ohne Medikamente?"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              maxWidth: 860,
              p: { xs: 2, md: 2.5 },
              borderLeft: "6px solid",
              borderColor: "primary.main",
              bgcolor: "rgba(5,150,105,0.08)",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: { xs: "1rem", md: "1.05rem" },
              }}
            >
              <LocalFloristOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} aria-hidden />
              Akupunktur – sanfte Unterstützung bei Schmerzen
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Akupunktur ist ein bewährtes Verfahren der Traditionellen Chinesischen Medizin und
              wird heute auch begleitend in der modernen Schmerztherapie eingesetzt. Sie kann
              insbesondere bei chronischen Beschwerden wie Arthrose dazu beitragen, Schmerzen zu
              lindern und die Beweglichkeit zu verbessern. Die Behandlung ist individuell
              ausgerichtet, gut verträglich und eignet sich als schonende Ergänzung zu anderen
              therapeutischen Maßnahmen.
            </Typography>
          </Box>
        </Section>
      </PageContainer>
    </Box>
  );
}
