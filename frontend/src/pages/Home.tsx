import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import { HeroSlider } from "../components/HeroSlider.tsx";

export function Home() {
  const infoCards = [
    {
      title: "Iridologie, Homöopathie, Akupunktur",
      image: "/hero/acumpuntua.jpg",
      items: [
        "Iridologie",
        "Homöopathie",
        "Akupunktur",
        "Chiropraxis",
        "Funktionelle Osteopathie und Integration (FOI)",
        "Vegacheck",
        "VNS-Analyse",
      ],
    },
    {
      title: "Psychotherapie & Beratung",
      image: "/hero/pinscicologie.jpg",
      items: [
        "Ängste",
        "Stress und Druck",
        "Umgang mit schwierigen Lebensereignissen und Herausforderungen",
        "Selbstwertprobleme / geringer Selbstwert",
        "Paarberatung und Therapie",
      ],
    },
    {
      title: "Pädagogik & Lerntherapie",
      image: "/hero/kindertherapie.jpg",
      items: [
        "Pädagogin und Lerntherapeutin",
        "Lerntherapeutisches Training",
        "bei Lese/Rechtschreibschwäche / Legasthenie",
        "bei Rechenschwäche / Dyskalkulie",
      ],
    },
    {
      title: "Interdisziplinäre Therapie",
      image: "/hero/acumpuntua.jpg",
      items: [
        "Interdisziplinäre Faszien Therapie (IFT®)",
        "Stress und Schmerz Resilienz nach Gordon Health®",
        "TCM - Traditionelle chinesische Medizin",
        "Akupunktur",
        "Schröpfen",
        "CMD-Kieferbehandlung bei Dysfunktion",
        "Physiotherapie (Selbstzahler)",
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.05 }}>
              Herzlich Willkommen im Heilpraktiker - Zentrum in Bleialf
            </Typography>

           

            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary", maxWidth: 720 }}>
              Akupunktur, Psychotherapie und Lerntherapie – interdisziplinär, individuell und menschlich.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
              <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 999, px: 3 }}>
                Termin anfragen
              </Button>
              <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: 999, px: 3 }}>
                Unser Team
              </Button>
            </Box>
          </Box>

          <HeroSlider />
        </Box>

        <Box sx={{ mt: { xs: 6, md: 10 }, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              background:
                "linear-gradient(135deg, rgba(86,136,37,1) 0%, rgba(86,136,37,0.92) 50%, rgba(86,136,37,0.84) 100%)",
              color: "common.white",
              p: { xs: 3, md: 6 },
              maxWidth: 900,
              borderTop: "3px solid",
              borderColor: "secondary.main",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: -40,
                top: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.18)",
              }}
            />
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: 30,
                bottom: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.12)",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "common.white" }}>
              Unser Ziel ist es, möglichst lange gesund und aktiv zu leben!
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.9)" }}>
              Um dieses Ziel der Gesunderhaltung zu erreichen, ist eine vorsorgliche Diagnostik
              vonnöten. Wenn wir vorsorglich, in dem hochkomplexen System Mensch, Abweichungen von
              der Norm entdecken und dann beeinflussen, können wir vielfach Gesundheit erhalten.
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.9)" }}>
              Eine frühest mögliche Therapie basiert immer auf einer frühest möglichen Diagnostik.
              Diese Diagnostik sollte den Menschen von den verschiedensten Ebenen aus betrachten um
              Informationen über einen Zustand finden zu können, bevor Strukturschäden (Defekte)
              sich entwickelt haben.
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.9)" }}>
              Deshalb sind wir ein Team von motivierten Therapeuten, aus den verschiedensten
              Bereichen, welches engagiert versucht unser Konzept für Ihre Gesunderhaltung
              umzusetzen.
            </Typography>

            <Typography sx={{ mt: 3, color: "rgba(255,255,255,0.9)" }}>
              Mit freundlichen Grüßen
              <br />
              Johannes Willems
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
            Unsere Schwerpunkte
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 3,
            }}
          >
            {infoCards.map((card) => (
              <Box
                key={card.title}
                component={Link}
                to="/team"
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
                <Box
                  sx={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Box sx={{ p: 3, display: "grid", gap: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2, color: "text.secondary" }}>
                    {card.items.map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.5 }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ justifySelf: "start", fontWeight: 700, px: 0 }}
                  >
                    Mehr erfahren
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
            Schmerzfrei ohne Medikamente?
          </Typography>
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
              bgcolor: "rgba(86,136,37,0.06)",
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
              <LocalFloristOutlinedIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
                aria-hidden
              />
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
        </Box>
      </Container>
    </Box>
  );
}
